import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

import * as $ from 'jquery';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.scss']
})
export class AddPromoComponent implements OnInit {



  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<AddPromoComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(): void{

    if(this.editData){
      this.actionbtn = 'Update';
      this.promoTitle = this.editData.promoTitle;
      this.promoCode = this.editData.promoCode;
      this.promoDiscountPercentage = this.editData.discountPercentage;
      this.Description = this.editData.promoDescription;
    }
 
  }
  

  saveFlag=true;
  actionbtn='Save';
  promoTitle:any = '';
  promoCode:any = '';
  promoDiscountPercentage:any;
  Description:any = '';


  save(){
    if(this.promoTitle == '' || this.promoTitle == undefined){
      this.msg.WarnNotify('Enter Promo Title')
    }else if(this.promoCode == '' || this.promoCode == undefined){
      this.msg.WarnNotify('Insert Promo Code')
    }else if(this.promoDiscountPercentage == '' || this.promoDiscountPercentage == undefined){
      this.msg.WarnNotify('Enter Discount Percentage')
    }else {
      
      if(this.Description == '' || this.Description == undefined){
        this.Description = '-';
      }

      if(this.actionbtn == 'Save'){
        this.insertPromo()
      }else if(this.actionbtn == 'Update'){
        this.updatePromo();
      }

    }
  }




  insertPromo(){
    $('.loaderDark').show();
    this.http.post(environment.mainApi+'insertpromo',{
    PromoTitle:this.promoTitle,
    PromoCode: this.promoCode,
    PromoDescription:this.Description,
    DiscountPercentage: this.promoDiscountPercentage,
    UserID: this.global.getUserID()
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.dialogRef.close('Update');
          $('.loaderDark').fadeOut(500);
        }else{
          this.msg.WarnNotify(Response.msg);
          $('.loaderDark').fadeOut(500);
        }
      }
    )
  }


  updatePromo(){
    this.http.post(environment.mainApi+'updatepromo',{
      PromoID:this.editData.promoID,
      PromoTitle:this.promoTitle,
      PromoCode: this.promoCode,
      PromoDescription:this.Description,
      DiscountPercentage: this.promoDiscountPercentage,
      UserID: this.global.getUserID()
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Updated Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.reset();
            this.dialogRef.close('Update');
          }else{
            this.msg.WarnNotify(Response.msg);
          }
        }
      )
    
  }

  


  ///////////// will reset the form fields
  reset(){
    this.actionbtn='Save';
    this.promoTitle ='';
    this.promoCode = '';
    this.promoDiscountPercentage ='';
    this.Description ='';
  }
  


  /////// will close the form
  closeDialogue(){
    this.dialogRef.close('Update');
  }


  // /////// will change the service code value to 0 if value is less tha 0
  // changeValue(){
  //   if(this.serviceCode < 0){
  //     this.serviceCode = 0;
  //   }
  // }


}
