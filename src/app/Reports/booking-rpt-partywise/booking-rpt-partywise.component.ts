import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailsComponent } from 'src/app/Components/booking/booking-details/booking-details.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-booking-rpt-partywise',
  templateUrl: './booking-rpt-partywise.component.html',
  styleUrls: ['./booking-rpt-partywise.component.scss']
})
export class BookingRptPartywiseComponent implements OnInit{




 

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
    this.global.setHeaderTitle('Booking Report Customerwise');
    this.getParty();
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.CompanyName = this.global.CompanyName;
    this.CompanyName2 = this.global.CompanyName2;
    this.companyAddress = this.global.Address;
    this.companyPhone = this.global.Phone;
  }



  searchCustomer:any;
  fromDate:any = new Date();
  toDate:any = new Date();
  partyID:any;
  customerName:any = '';


  rentTotal:any = 0;
  advanceTotal:any = 0;

  reportData:any = [];



  partyList:any = [];


  
  getParty(){
    this.http.get(environment.mainApi+'getparty').subscribe(
    {
      next:value =>{
        this.partyList = value;
        
      
      },
      error: error=>{
        this.msg.WarnNotify('Error Occured While Loading Data')
       
      }        
      
      
    }
    )
  }


  getReport(){
    if(this.partyID == '' || this.partyID == undefined){
      this.msg.WarnNotify('Select Customer');
    }else{
      this.app.startLoaderDark();

      var curCustomer = this.partyList.find((a:any)=>a.partyID == this.partyID);
      this.customerName = curCustomer.partyName;



      this.http.get(environment.mainApi+'GetBookingBetweenDate?fromdate='+this.global.dateFormater(this.fromDate,'-')+
      '&todate='+this.global.dateFormater(this.toDate,'-')).subscribe(
        (Response:any)=>{
         
         
          this.reportData =Response.filter((e:any)=>e.partyID == this.partyID);

          this.rentTotal = 0;
          this.advanceTotal = 0;

          this.reportData.forEach((e:any) => {
            this.rentTotal +=(e.rentPerDay * e.totalDays) ;
            this.advanceTotal += e.advancePaid;
          });


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
