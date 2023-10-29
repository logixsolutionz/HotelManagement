import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-room-comparison-rpt',
  templateUrl: './room-comparison-rpt.component.html',
  styleUrls: ['./room-comparison-rpt.component.scss']
})
export class RoomComparisonRptComponent implements OnInit {
  logo:any;
  logo1:any;
   CompanyName :any;
   CompanyName2:any;
   companyAddress :any;
   companyPhone :any;

  
  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private global:GlobalDataModule,
    private app:AppComponent
  ){}

  ngOnInit(): void {
    this.global.setHeaderTitle('Room Income Detial Report');
    
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.CompanyName = this.global.CompanyName;
    this.CompanyName2 = this.global.CompanyName2;
    this.companyAddress = this.global.Address;
    this.companyPhone = this.global.Phone;
  }



 
  fromDate:Date = new Date();
  toDate:Date = new Date();
  searchCustomer:any;
  DaysInMonth:any;
  totalIncomeTotal:any = 0;
  estimatedIncomeTotal:any = 0;


  ReportData:any = [];

  getReport(){

    this.app.startLoaderDark();

    this.http.get(environment.mainApi+'GetRoomIncBetweenDate?fromdate='+this.global.dateFormater(this.fromDate,'-')
    +'&todate='+this.global.dateFormater(this.toDate,'-')).subscribe(
      (Response:any)=>{
        this.DaysInMonth = this.global.calculateDaysBetweenDates(this.global.dateFormater(this.fromDate,'-'),this.global.dateFormater(this.toDate,'-'));
        this.ReportData = Response;

        Response.forEach((e:any) => {
          this.totalIncomeTotal += e.totalIncome;
          this.estimatedIncomeTotal += e.rentPerDay * this.DaysInMonth;
        });

        this.app.stopLoaderDark();
      }
    )

  }


  print(){
  this.global.printData('#printDiv');
  }

}
