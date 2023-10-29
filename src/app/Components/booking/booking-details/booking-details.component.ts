import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent  implements OnInit {


  
  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<BookingDetailsComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(): void {

    if(this.editData){
      this.lblBookingNo = this.editData.bookingID;
      this.lblBookingDate = this.editData.bookingDate;
      
      this.lblBookingStatus = this.editData.bookingStatus;
      this.lblAdvanceJvNo = this.editData.invoiceNo;
      this.lblRefundJvNo = this.editData.refundInvNo;
      this.lblBookingRemarks = this.editData.bookingDescription;
      this.lblBookingChannel = this.editData.bookingThrough;
      this.lblCustomerName = this.editData.partyName;
      this.lblRentPerDay = this.editData.rentPerDay;
      this.lblRoomTitle = this.editData.roomTitle;
      this.lblTotalDays = this.editData.totalDays;
      this.lblPaidAmount = this.editData.advancePaid;
      this.lblArrivalDate  = this.editData.dateOfArrival;
      this.lblDepartureDate = this.editData.dateOfDeparture;
      this.lblConfirmationDate = this.editData.confirmationDate;
      this.lblPartyCNIC = this.editData.partyCNIC;
      this.lblArrivalTime = this.editData.dateOfArrival.substring(11,19);
      this.lblDepartureTime = this.editData.dateOfDeparture.substring(11,19);
      this.lblReference = this.editData.reference;
      this.lblPersons = this.editData.persons;
    }
  
  }


   ////////////////////////////////////////////////


   lblVoucherPrintDate = new Date();
   lblBookingNo:any;
   lblBookingDate:any;
   lblAdvanceJvNo:any;
   lblRefundJvNo:any;
   lblBookingStatus:any
   lblBookingRemarks:any;
   lblBookingChannel:any;
   lblCustomerName:any;
   lblRentPerDay:any;
   lblRoomTitle:any; //
   lblTotalDays:any; //
   lblPaidAmount:any; //
   lblArrivalDate:any;
   lblArrivalTime:any;
   
   lblDepartureDate:any;
   lblDepartureTime:any;
   lblConfirmationDate:any;
   lblPartyCNIC:any;
   lblReference:any;
   lblPersons:any;
   
 


   closeDialogue(){
    this.dialogRef.close();
   }

}
