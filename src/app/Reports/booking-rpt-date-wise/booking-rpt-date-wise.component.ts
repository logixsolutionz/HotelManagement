import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailsComponent } from 'src/app/Components/booking/booking-details/booking-details.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-booking-rpt-date-wise',
  templateUrl: './booking-rpt-date-wise.component.html',
  styleUrls: ['./booking-rpt-date-wise.component.scss']
})
export class BookingRptDateWiseComponent implements OnInit{

  logo:any;
  logo1:any;
   CompanyName :any;
   CompanyName2:any;
   companyAddress :any;
   companyPhone :any;

  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private app:AppComponent,
    private global:GlobalDataModule,
    private dialogue:MatDialog

  ){}


  ngOnInit(): void {
    
    this.global.setHeaderTitle('Booking Rpt DateWise');
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.CompanyName = this.global.CompanyName;
    this.CompanyName2 = this.global.CompanyName2;
    this.companyAddress = this.global.Address;
    this.companyPhone = this.global.Phone;

  }

  bookingType:any;
  fromDate = new Date();
  toDate = new Date();


  ReportData:any;

  bookingData:any;




  StatusList = [
    {title:'All'},
    {title:'Pending'},
    {title:'Cancelled'},
    {title:'Confirmed'},
    {title:'Refunded'},
    {title:'Visited'},
    
  ]



  getReport(){
    if(this.bookingType == '' || this.bookingType == undefined){
      this.msg.WarnNotify('Select Booking Type');
    }else{
      this.app.startLoaderDark();
      this.http.get(environment.mainApi+'GetBookingBetweenDate?fromdate='+this.global.dateFormater(this.fromDate,'-')+
      '&todate='+this.global.dateFormater(this.toDate,'-')).subscribe(
        (Response)=>{
         
          this.bookingData = Response;

         if(this.bookingType == 'All'){
          this.ReportData = Response;
          this.app.stopLoaderDark();
         }else{
          this.ReportData =this.bookingData.filter((e:any)=>e.bookingStatus == this.bookingType);
          this.app.stopLoaderDark();
         }

         this.app.stopLoaderDark();
  
        },
        (Error:any)=>{
          this.app.stopLoaderDark();
        }
      )
  
    }

    
  }

  print(){

    this.global.printData('#printDiv');
  }


  getBookingDetail(row:any){
    this.dialogue.open(BookingDetailsComponent,{
      width:"40%",
      data:row

    }).afterClosed().subscribe(val=>{
      
    })

  }

}
