import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-cio-details',
  templateUrl: './cio-details.component.html',
  styleUrls: ['./cio-details.component.scss']
})
export class CioDetailsComponent  implements OnInit{


  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public rowData : any,
    private dialogRef: MatDialogRef<CioDetailsComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }


  ngOnInit(): void {
    this.getPaymentHistory();
    this.getCheckInOutDetails(this.rowData);
    
  }

  lblVoucherNo:any;
  lblBookingID:any;
  lblAdvancePaid:any;
  lblBalanceAmont:any;
  lblDiscount:any;
  lblArrivalDate:any;
  lblDepartureDate:any;
  lblPartyName:any;
  lblServicesAmount:any;
  lblRoomNo:any;
  lblTotalDays:any;
  lblRentPerDay:any;
  lblActiveStatus:any;
  lblPartyCNIC:any;
  lblPartyMobileno:any;
  lblCompanyName:any;
  lblPromoTitle:any;
  lblDiscountPercentage:any;
  lblrpDwithoutDP:any;

  lblServiceList:any = [];
  paymentHistoryList:any = [];
  paymentAmountTotal:any;

  //////////////////////////////////////////////////////////////
   
  getCheckInOutDetails(row:any){
    //console.log(row);

    this.lblVoucherNo = row.checkinoutID;
    this.lblBookingID = row.bookingID;
    this.lblAdvancePaid = row.advancePaid;
    this.lblBalanceAmont = row.balanceAmount;
    this.lblArrivalDate = row.checkInDate;
    this.lblDepartureDate = row.checkOutDate;
    this.lblPartyName = row.partyName;
    this.lblPartyCNIC = row.partyCNIC;
    this.lblPartyMobileno = row.partyMobileNo;
    this.lblDiscount = row.discount;
    this.lblServicesAmount = row.servicesTotalAmount;
    this.lblRoomNo  = row.roomTitle;
    this.lblTotalDays = row.totalDays;
    this.lblRentPerDay = row.rentPerDay;
    this.lblActiveStatus = row.activeStatus;
    this.lblCompanyName =  row.companyName;
    this.lblPromoTitle = row.promoTitle;
    this.lblDiscountPercentage =  row.discountPercentage;
    this.lblrpDwithoutDP = row.rpDwithoutDP;

    this.http.get(environment.mainApi+'GetRoomServices?cioid='+row.checkinoutID).subscribe(
      (Response)=>{

        
        this.lblServiceList = Response;
        
      }
    )


    

  }


  getPaymentHistory(){
    this.http.get(environment.mainApi+'GetCioPaymentHistory?cioid='+this.rowData.checkinoutID).subscribe(
      (Response:any)=>{
        this.paymentAmountTotal = 0;

        this.paymentHistoryList = Response;
        Response.forEach((e:any) => {
          this.paymentAmountTotal += e.paymentAmount;
        });
      

      }
    )
  }
  //////////////////////////////////////////////////////////////

  closeDialogue(){
    this.dialogRef.close();
  }






 

}
