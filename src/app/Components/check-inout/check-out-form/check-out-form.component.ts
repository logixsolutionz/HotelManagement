import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-out-form',
  templateUrl: './check-out-form.component.html',
  styleUrls: ['./check-out-form.component.scss']
})
export class CheckOutFormComponent implements OnInit{

  today = new Date();

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public rowData : any,
    private dialogRef: MatDialogRef<CheckOutFormComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }

  ngOnInit(): void {

    
    this.roleID = this.global.getRoleId();
    this.getCoaList();
    this.getTotalDays();
    if(this.rowData){
      this.checkInDate = this.rowData.checkInDate.substring(0,10);
      this.checkInTime = this.rowData.checkInTime;
      this.discount = 0;
    }
    
  }

  coaSearch:any;
  roleID:any;

  remainingAmount:any = 0;

  balanceAmount:any;

  checkInDate:any; 
  checkInTime:any;
  checkOutDate:any = new Date();
  checkOutTime:any = this.today.getHours() + ":" + this.today.getMinutes() ;  
  discount:any;
  totalDays:any;
  coaID:any;


  coaList:any = [];


  //////////////////////////////////////////////////////////////

  getTotalDays(){
  
   var totalHours:any = this.global.getHours(this.rowData.checkInDate.substring(0,10),this.rowData.checkInTime,this.global.dateFormater(this.checkOutDate,'-'),this.checkOutTime);

  //  this.totalDays = totalHours / 24 ;
   var days:any = totalHours / 24 ;

   var firstNumber = parseInt(days);
   var secondNumber = parseFloat(days);

   var differce:any = (secondNumber - firstNumber).toString().substring(2,4) ;

   if(differce < '5' && differce > '0'){
    this.totalDays = Math.round(days) + 1;
   }else {
    this.totalDays = Math.round(days);
   }


   this.remainingAmount = (this.rowData.rentPerDay * this.totalDays) - this.rowData.advancePaid + this.rowData.servicesTotalAmount;
   this.balanceAmount = this.remainingAmount;


  }


  //////////////////////////////////////////////////////////////
  
  numberOnly(val:any){
    return  this.global.avoidMinus(val);
   
  }

  
  //////////////////////////////////////////////////////////////


  getCoaList(){
    this.http.get(environment.mainApi+'GetCashBankCOA').subscribe(
      (Response)=>{
    
        this.coaList = Response;
        
      }
    )
  }

//////////////////////////////////////////////////////////////

  insertCheckOut(){

    if(this.checkOutDate == '' || this.checkOutDate == undefined){
      this.msg.WarnNotify('Select Check Out Date')
    }else if(this.checkOutTime == '' || this.checkOutTime == undefined){
      this.msg.WarnNotify('Enter Check Out Time')
    }else if(this.balanceAmount < 0 || this.balanceAmount == undefined){
      this.msg.WarnNotify('Enter valid Balance Amount')
    }else if(this.remainingAmount - (this.balanceAmount + this.discount) != 0){
      this.msg.WarnNotify('Balance Amount is not Valid')
    }
    else if(this.totalDays == '' || this.totalDays == 0 ||this.totalDays < 0 || this.totalDays == undefined){
      this.msg.WarnNotify('Total Days are not Valid')
    }else if(this.coaID == '' || this.coaID == undefined){
      this.msg.WarnNotify('Select Payment Head')
    }else{

      Swal.fire({
        title:'Alert!',
        text:'Confirm to Check OUt',
        position:'center',
        icon:'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
      }).then((result)=>{
        if(result.isConfirmed){
  
          //////on confirm button pressed the api will run
          if(this.discount == '' || this.discount == undefined){
            this.discount = 0;
          }

          if(this.balanceAmount == ''){
            this.balanceAmount = 0;
          }
    
          this.http.post(environment.mainApi+'insertcheckout',{
            CheckInOutID:this.rowData.checkinoutID,
            CheckOutDate: this.global.dateFormater(this.checkOutDate,'-'),
            CheckOutTime: this.checkOutTime,
            TotalDays:this.totalDays,
            COAID:this.coaID,
            BalanceAmount: this.balanceAmount,
            Discount: this.discount,
            RoomID:this.rowData.roomID,
            
            UserID: this.global.getUserID()
            
          }).subscribe(
            (Response:any)=>{
              if(Response.msg == 'Data Saved Successfully'){
                this.msg.SuccessNotify(Response.msg);
                this.closeDialogue('Update');
              }else{
                this.msg.WarnNotify(Response.msg);
              }
            }
          )
        }
      });

   
    }

   
  }


  //////////////////////////////////////////////////////////////

  closeDialogue(val:any){
    this.dialogRef.close(val);
    this.checkOutDate = new Date();
    this.checkOutTime = '';
    this.balanceAmount = '';
    this.remainingAmount = '';
    this.discount = '';
    this.totalDays = '';
    this.coaID = '';
  }



}
