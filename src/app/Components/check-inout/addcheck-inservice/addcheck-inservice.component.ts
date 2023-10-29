import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import * as $ from 'jquery';
import { CheckINOUtComponent } from '../check-inout.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcheck-inservice',
  templateUrl: './addcheck-inservice.component.html',
  styleUrls: ['./addcheck-inservice.component.scss']
})
export class AddcheckINServiceComponent implements OnInit {
  today = new Date()

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<CheckINOUtComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }


  ngOnInit(): void {

    

    this.getServices();
    this.getSavedServices();
    
  }

  serviceSearch:any;
  serviceID:any;
  serviceCharges:any;
  amountCharged:any;
  quantity:any;
  serviceDate:any = this.today;
  serviceTime:any = this.today.getHours() + ':' + this.today.getMinutes();


  servicesList:any = [];

  savedServicesList:any = [];


  //////////////////////////////////////////////////////////////

  getServices(){
    this.http.get(environment.mainApi+'getservice').subscribe(
     {
       next:value=>{
         this.servicesList = value;
          //console.log(value);
       }
     }
    ) 
   }

   //////////////////////////////////////////////////////////////

   onServiceChange(){
    var curService = this.servicesList.find((e:any)=>e.serviceID == this.serviceID);

    this.amountCharged = curService.serviceCharges;
    this.serviceCharges = curService.serviceCharges;
   }

   //////////////////////////////////////////////////////////////


   addService(){
    if(this.serviceID == '' || this.serviceID == undefined){
      this.msg.WarnNotify('Select Service ID');
    }else if(this.amountCharged == '' || this.amountCharged == undefined){
      this.msg.WarnNotify('Enter The Amount')
    }else if(this.quantity == '' || this.quantity == undefined){
      this.msg.WarnNotify('Enter Quantity')
    }else if(this.serviceDate == '' || this.serviceDate == undefined){
      this.msg.WarnNotify('Select The Date')
    }else if(this.serviceTime == '' || this.serviceTime == undefined){
      this.msg.WarnNotify('Enter Time')
    }else{
      $('.loaderDark').show();
      this.http.post(environment.mainApi+'InsertRoomService',{
        CheckInOutID:this.editData.checkinoutID,
      ServiceID:this.serviceID,
      ServiceDate: this.global.dateFormater(this.serviceDate,'-'),
      ServiceTime: this.serviceTime,
      ServiceCharges: this.serviceCharges,
      Quantity:this.quantity,
      AmountCharged:this.amountCharged,
      
      UserID: this.global.getUserID()
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Saved Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.reset();
            this.getSavedServices();
            $('.loaderDark').fadeOut();

          }else{
            this.msg.WarnNotify(Response.msg);
            $('.loaderDark').fadeOut();
          }
        },  
        (Error:any)=>{
          $('.loaderDark').fadeOut();
        }
      )
    }
   

   }


   //////////////////////////////////////////////////////////////

   deleteService(row:any){

    console.log(row);
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
      
    this.http.post(environment.mainApi+'DeleteRoomService',{
      CIODAutoID:row.ciodAutoID,
      CheckInOutID:row.checkInOutID,    
      UserID: this.global.getUserID()
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Deleted Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.getSavedServices();
          $('.loaderDark').fadeOut(500);
        }else {
          this.msg.WarnNotify(Response.msg);
          $('.loaderDark').fadeOut(500);
        }
      }
    )
      }
    });
    

  
   }

//////////////////////////////////////////////////////////////

   getSavedServices(){
    this.http.get(environment.mainApi+'GetRoomServices?cioid='+this.editData.checkinoutID).subscribe(
      (Response)=>{

        this.savedServicesList = Response;
         //console.log(Response);
      }
    )
   }

   //////////////////////////////////////////////////////////////

   reset(){
    this.serviceID = '';
    this.amountCharged = '';
    this.quantity = '';
    this.serviceDate = '';
    this.serviceTime = '';
   }
 

//////////////////////////////////////////////////////////////

   closeDialogue(){
    this.dialogRef.close('Update');
   }



}
