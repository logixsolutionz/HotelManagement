import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-customer-check-in-rpt',
  templateUrl: './customer-check-in-rpt.component.html',
  styleUrls: ['./customer-check-in-rpt.component.scss']
})
export class CustomerCheckInRptComponent implements OnInit {


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
    this.global.setHeaderTitle('Customer Check In Detail Report');
    this.getCity();
    this.getCountry();
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.CompanyName = this.global.CompanyName;
    this.CompanyName2 = this.global.CompanyName2;
    this.companyAddress = this.global.Address;
    this.companyPhone = this.global.Phone;


  }



 
  fromDate:any = new Date();
  toDate:any = new Date();
  searchCustomer:any;
  countrySearch:any;
  citySearch:any;
  cityName:any;
  countryName:any;
  
 
  ReportData:any = [];
  citiesList:any = [];
  countryList:any = [];


  getReport(item:any){
    
    if(item == 'country' && (this.countryName == '' || this.countryName == undefined)){
      this.msg.WarnNotify('Select Country')
    }else if(item == 'city' && (this.cityName == '' || this.cityName == undefined)){
      this.msg.WarnNotify('Select City')
    }else{
      this.app.startLoaderDark();
      this.http.get(environment.mainApi+'GetCustomerCheckInDetail?fromdate='+this.global.dateFormater(this.fromDate,'-')
      +'&todate='+this.global.dateFormater(this.toDate,'-')).subscribe(
        (Response:any)=>{
          // console.log(Response);
          if(item == 'all'){
            this.ReportData = Response;
          }
  
          if(item == 'country'){
            this.ReportData = Response.filter((e:any)=>e.countryName == this.countryName);
          }
          if(item == 'city'){
            this.ReportData = Response.filter((e:any)=>e.cityName == this.cityName);
          }
          this.app.stopLoaderDark();
        },
        (Error)=>{
          this.app.stopLoaderDark();
        }
  
        
      )
    }

  

  }


  getCity(){
    this.http.get(environment.mainApi+'getcity').subscribe({
      next:value=>{
    
        this.citiesList = value;
      },
      error:error=>{
        console.log(error);
      }
    })
  }


  getCountry(){
    this.http.get(environment.mainApi+'getcountry').subscribe(
      (Response)=>{
        this.countryList = Response;
      },
      (Error)=>{
        this.msg.WarnNotify('Error Occured while Loading Countries List')
      }
    )
  }

  print(){
    this.global.printData('#printDiv');
  }

}
