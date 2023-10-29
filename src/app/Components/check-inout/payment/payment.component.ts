import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{


  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<PaymentComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }

  ngOnInit(): void {
    this.getPaymentHistory();
    this.getCoaList();
   this.remainingAmount = (this.editData.rentPerDay * this.editData.totalDays ) + this.editData.servicesTotalAmount - this.editData.advancePaid ;
    
  }


  remainingAmount:any = 0;

  paymentDate:any = new Date();
  cioRemarks:any;
  paymentAmount:any = 0;
  coaID:any = 0;

  coaList:any = [];
  paymentHistoryList:any = [];


  getCoaList(){
    this.http.get(environment.mainApi+'GetCashBankCOA').subscribe(
      (Response)=>{
    
        this.coaList = Response;
        
      }
    )
  }



  save(){

    if(this.paymentAmount == '' || this.paymentAmount == 0 || this.paymentAmount == undefined){
      this.msg.WarnNotify('Enter Payment Amount')
    }else if(this.paymentDate == '' || this.paymentDate == undefined){
      this.msg.WarnNotify('Select Payment Date')
    }else if(this.coaID == '' || this.coaID == 0 || this.coaID == undefined){
      this.msg.WarnNotify('Select Coa Title')
    }else if(this.paymentAmount > this.remainingAmount){
      this.msg.WarnNotify('Amount Not Valid')
    } else {

      $('.loaderDark').show();
      
      if(this.cioRemarks == '' || this.cioRemarks == undefined){
        this.cioRemarks = '-'
      }

      this.http.post(environment.mainApi+'insertcheckinreceipt',{
        CheckInOutID:this.editData.checkinoutID,
        PaymentDate: this.global.dateFormater(this.paymentDate,'-'),
        CioRemarks: this.cioRemarks,
        PaymentAmount: this.paymentAmount,
        COAID:this.coaID,
        UserID: this.global.getUserID()
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Saved Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.dialogRef.close('Update');
            $('.loaderDark').fadeOut(500);
          }else {
            this.msg.WarnNotify(Response.msg);
            $('.loaderDark').fadeOut(500);
          }
        }
      )
     
    }
  }


  deletePayment(row:any){

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
        this.http.post(environment.mainApi+'DeleteCIOVoucher',{
          InvoiceNo:row.invoiceNo,
          UserID: this.global.getUserID(),
          }).subscribe(
            (Response:any)=>{
              if(Response.msg == 'Data Deleted Successfully'){
                this.msg.SuccessNotify(Response.msg);
                this.getPaymentHistory();
                this.dialogRef.close('Update');

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


  getPaymentHistory(){
    this.http.get(environment.mainApi+'GetCioPaymentHistory?cioid='+this.editData.checkinoutID).subscribe(
      (Response)=>{
        // console.log(Response);
        this.paymentHistoryList = Response;
      }
    )
  }

  reset(){
    this.paymentDate = new Date();
    this.paymentAmount = 0;
    this.coaID = 0;
    this.cioRemarks = '';

  }


  closeDialogue(){
    this.dialogRef.close();
  }


}
