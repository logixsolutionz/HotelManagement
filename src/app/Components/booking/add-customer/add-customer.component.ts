import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

import * as $ from 'jquery';
import { AddcityformComponent } from '../../settings/city/addcityform/addcityform.component';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<AddCustomerComponent>,
    private globalData: GlobalDataModule,
 
    private http : HttpClient,
    private msg : NotificationService,
    private dialogue:MatDialog
  
  ){}



  ngOnInit(): void {

    this.getCityNames();
  
  }


  citySearch:any
  searchtxt:any;
  btnType = "Save";
  curPartyId:any;
  partyType :any;
  partyName :any;
  partyCNIC :any;
  passportNo:any;
  partyPhoneno:any;
  partyMobileno:any;
  partyTelephoneno:any;
  City :any;
  partyAddress:any;
  description :any;



    //////////////////////////////////////////////////////
  //////////////////////getting the City Names/////////////////
  //////////////////////////////////////////////////////////////

  CitiesNames : any = []

  getCityNames(){
    this.http.get(environment.mainApi+'getcity').subscribe(
      {
        next : value =>{
          this.CitiesNames = value;
        },
        error : error=>{
          console.log(error);
        }
      }
    )
  }



  
addCity(){
  this.dialogue.open(AddcityformComponent,{
    width:"40%",

  }).afterClosed().subscribe(val=>{
    if(val == 'Update'){
      this.getCityNames();
    }
  })
}



  
  saveParty(){
    if(this.partyType == "" || this.partyType == undefined){
      this.msg.WarnNotify("Select The Party Type");
    }else if(this.partyName == "" || this.partyName == undefined){
      this.msg.WarnNotify("Enter The Party Name");
      
    }else if(this.partyCNIC == "" || this.partyCNIC == undefined ){
      this.msg.WarnNotify("Enter Party CNIC")
    }
    else if(this.passportNo == "" || this.passportNo == undefined ){
      this.msg.WarnNotify("Enter PassPort No");
    }else if(this.partyMobileno == "" || this.partyMobileno == undefined){
      this.msg.WarnNotify("Enter Party Mobile Number")
    }
    else if(this.partyTelephoneno == "" || this.partyTelephoneno == undefined){
      this.msg.WarnNotify("Enter Party Telephone Number")
    }else if(this.City == "" || this.City == undefined){
      this.msg.WarnNotify("Select The City")
    }else if(this.partyAddress == "" || this.partyAddress == undefined){
      this.msg.WarnNotify("Enter The Party Address")
    }else if(this.description == "" || this.description == undefined){
    this.description = "-";
  }else if(this.partyCNIC.length < 15){
    this.msg.WarnNotify("Please Enter the Valid CNIC No.")
  }else if(this.partyMobileno.length < 12){
    this.msg.WarnNotify("Please Enter the Valid Mobile NO.")
  }
  else if(this.partyTelephoneno.length < 11){
    this.msg.WarnNotify("Please Enter the Valid Telephone NO.")
  }else{

    $('.loaderDark').show();
      

      this.http.post(environment.mainApi+'insertparty',{
        PartyType:this.partyType,
        PartyName:this.partyName,
        PartyAddress:this.partyAddress,
        PartyCNIC:this.partyCNIC,
        CityID:this.City,
        PassportNo:this.passportNo,
        PartyMobileNo:this.partyMobileno,
        TelephoneNo:this.partyTelephoneno,
        PartyDescription:this.description,
        UserID:this.globalData.getUserID(),
   
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



  }

/////////////to Set CNIC Field Formate/////////////////
  setCnicData() {
    if (
      this.partyCNIC.length == 5 ||
      this.partyCNIC.length == 13
    ) {
      this.partyCNIC = this.partyCNIC + '-';
    }
  }

  ////////////////////to Set Phone No field Formate//////////////
  setPhoneno(){
    if(this.partyTelephoneno.length == 3){
      this.partyTelephoneno = this.partyTelephoneno + '-';
    } 
  }

  ////////////Mobile no field formate//////////////////////////
  mobileNoFormate(){
    if(this.partyMobileno.length == 4){
      this.partyMobileno = this.partyMobileno + '-';
    }
  }


  closedialogue(){
    this.dialogRef.close();
  }
  
  reset(){
    this.partyType = '';
    this.partyName = '';
    this.partyCNIC = '';
    this.partyTelephoneno = '';
    this.partyMobileno = '';
    this.City = '';
    this.passportNo = '';
    this.partyAddress="";
    this.description = '';
    this.btnType = "Save";
   }

}
