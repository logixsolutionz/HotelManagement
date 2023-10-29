import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

import * as $ from 'jquery';

@Component({
  selector: 'app-mapping-form',
  templateUrl: './mapping-form.component.html',
  styleUrls: ['./mapping-form.component.scss']
})
export class MappingFormComponent implements OnInit {


  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<MappingFormComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService,
  ){

  }
  ngOnInit(): void {
    this.getPromo();
    this.getCompany();
  }

  searchPromo:any;
  promoID:any;
  companyID:any;
  searchCompany:any;
  startDate:any = new Date();
  endDate:any = new Date();




  promoList:any =[];
  companyList:any = [];



  closeDialogue(){
    this.dialogRef.close();
  }


  ////////////////////////////////////////////////////


  getPromo(){
    

    this.http.get(environment.mainApi+'getpromo').subscribe(
    (Response)=>{
      this.promoList = Response;
      // console.log(Response);
    }
    )

  }



  //////////////////////////////////////////////////

  getCompany(){
    this.http.get(environment.mainApi+'GetCompany').subscribe(
      (Response)=>{
        this.companyList = Response;
        console.log(Response);
      }
    )
  }



  insertCompanyPromo(){

    if(this.promoID == '' || this.promoID == undefined){
      this.msg.WarnNotify('Select Promo Rate')
    }else if(this.companyID == '' || this.companyID == undefined){
      this.msg.WarnNotify('Select Company')
    }else {


      $('.loaderDark').show();

      this.http.post(environment.mainApi+'Insertcompanypromo',{
        CompanyID: this.companyID,
        PromoID: this.promoID,
        PromoStartDate: this.global.dateFormater(this.startDate,'-'),
        PromoEndDate: this.global.dateFormater(this.endDate,'-'),
        UserID: this.global.getUserID()
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Saved Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.dialogRef.close('Update');
            this.reset();
            $('.loaderDark').fadeOut(500);
          }else{
            this.msg.WarnNotify(Response.msg)
            $('.loaderDark').fadeOut(500);
          }
        },
        (error:any)=>{
          $('.loaderDark').fadeOut(500);
  
        }
      )

    }




  
  }


  reset(){

    this.promoID = '';
    this.companyID = '';
    this.startDate = new Date();
    this.endDate = new Date();
    

  }




}
