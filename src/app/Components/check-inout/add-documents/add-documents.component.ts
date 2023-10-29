import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss']
})
export class AddDocumentsComponent implements OnInit {



  logo:any;
  logo1:any;
  CompanyName :any;
   CompanyName2:any;
   companyAddress :any;
  companyPhone :any;
  companyMobileno:any;
  companyEmail:any;

  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private global:GlobalDataModule,
 
    @Inject(MAT_DIALOG_DATA) public rowData : any,
    private dialogRef: MatDialogRef<AddDocumentsComponent>,
  ){

  }


  ngOnInit(): void {


    this.getDocuments();
   
  }

  imageFile:any;
  documentTitle:any;
  description:any;
  fileName:any;


  image:any;


  documentsList:any = [];

  titleList:any = [{title:'Family Info'}, {title:'Check Out Info'}]




  //////////////////////////////////////////////////////////
  getDocuments(){
    this.http.get(environment.mainApi+'GetCIODocument?cioid='+this.rowData.checkinoutID).subscribe(
      (Response)=>{
        this.documentsList = Response;
        //console.log(Response);
      }
    )
  }

  ////////////////////////////////////////////////////////

  onFileSelected(event:any) {


    let targetEvent = event.target;

    let file:File = targetEvent.files[0];

    let fileReader:FileReader = new FileReader();


    fileReader.onload =(e)=>{
      this.imageFile = fileReader.result;
    }

    fileReader.readAsDataURL(file);

    //console.log(this.imageFile);
  }


  //////////////////////////////////////////////////////////


 isSeparator = (value: string): boolean => value === '/'|| value === '\\' || value === ':';

 getExtension = (path: string): string => {
    for (let i = path.length - 1; i > -1; --i) {
        const value = path[i];
        if (value === '.') {
            if (i > 1) {
                if (this.isSeparator(path[i - 1])) {
                    return '';
                }
                return path.substring(i + 1);
            }
            return '';
        }
        if (this.isSeparator(value)) {
            return '';
        }
    }
    return '';
};


//////////////////////////////////////////////////////////////////

  insertDocument(){
    if(this.documentTitle == '' || this.documentTitle == undefined){
      this.msg.WarnNotify('Enter Document Title');
     
    }else if(this.imageFile == '' || this.imageFile == undefined){
      this.msg.WarnNotify('Select The File')
    }else if(this.getExtension(this.fileName) != 'pdf'){
      this.msg.WarnNotify('File Formate is not Valid must be PDF')
    }
    else {
      
      $('.loaderDark').show();

      if(this.description == '' || this.description == undefined){
        this.description = '-';
      }


      this.http.post(environment.mainApi+'InsertCIODocument',{
        CheckInOutID:this.rowData.checkinoutID,
        DocTitle:this.rowData.checkinoutID + ' - '+ this.documentTitle,
        Comments:this.description,
        CioDocument: this.imageFile,
    
        UserID: this.global.getUserID()
      }).subscribe(
        {
         next:(value:any) =>{
            if(value.msg == 'Data Saved Successfully'){
              this.msg.SuccessNotify(value.msg);
              this.getDocuments();
              this.reset();
              $('.loaderDark').fadeOut(500);
  
            }else{
              this.msg.WarnNotify(value.msg);
              $('.loaderDark').fadeOut(500);
            }
          },
          error:error =>{
            this.msg.WarnNotify('Error Occured While Loading Document')
            $('.loaderDark').fadeOut(500);
          }
        }

      )
    }
  }


  ////////////////////////////////////////////////////


  downloadFile(row:any){
    
   var newImage = row.cioDocument.replace('data:application/pdf;base64,','');

    const byteArray = new Uint8Array(atob(newImage).split('').map(char=> char.charCodeAt(0)));

    const file = new Blob([byteArray], {type:'application/pdf'});

    const fileURl = URL.createObjectURL(file);

    let fileName =  row.docTitle;
    let link = document.createElement('a');
    link.download = fileName;
    link.target = '_blank';
    link.href = fileURl;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);



  }

  
/////////////////////////////////////////////////////////

  deleteDocument(row:any){
    Swal.fire({
      title:'Alert!',
      text:'Confirm to Delete the Data',
      position:'center',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button pressed the api will run
        $('.loaderDark').show();
        this.http.post(environment.mainApi+'DeleteCIODocument',{
          PDAutoID:row.pdAutoID,   
          UserID: this.global.getUserID()
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getDocuments();
              $('.loaderDark').fadeOut(500);
            }else{
              this.msg.WarnNotify(Response.msg);
              $('.loaderDark').fadeOut(500);
            }
          }
        )
    
      }
    });

   

  }


  /////////////////////////////////////////////////

  closeDialogue(){
    this.dialogRef.close();
  }

  //////////////////////////////////////////////////////////

  reset(){
    this.documentTitle = '';
    this.description = '';
    this.imageFile = '';
    this.fileName = '';
   
    
  }



}
