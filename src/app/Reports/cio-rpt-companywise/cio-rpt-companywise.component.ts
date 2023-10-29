import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CioDetailsComponent } from 'src/app/Components/check-inout/cio-details/cio-details.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-cio-rpt-companywise',
  templateUrl: './cio-rpt-companywise.component.html',
  styleUrls: ['./cio-rpt-companywise.component.scss']
})
export class CioRptCompanywiseComponent implements OnInit {


  
 

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
    this.global.setHeaderTitle('Check In OUt Rpt Customerwise');
    this.getCompanies();
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.CompanyName = this.global.CompanyName;
    this.CompanyName2 = this.global.CompanyName2;
    this.companyAddress = this.global.Address;
    this.companyPhone = this.global.Phone;
  }



  searchCompany:any;
  fromDate:any = new Date();
  toDate:any = new Date();
  companyID:any;
  companyName:any = '';


  TotalAmount:any;

  reportData:any = [];


  
  companyList:any;



  ///////////////////////////////////////////////////////

  getCompanies(){
    this.app.startLoaderDark();
    this.http.get(environment.mainApi+'GetCompany').subscribe(
      (Response:any)=>{
        this.companyList = Response;
        // console.log(Response);
        this.app.stopLoaderDark();
       
      },
      (error:any)=>{
        this.app.stopLoaderDark();
      }
    )

  }




  getReport(){
    if(this.companyID == '' || this.companyID == undefined){
      this.msg.WarnNotify('Select Company')
    }else{
      this.app.startLoaderDark();

      var curCompany = this.companyList.find((a:any)=>a.companyName == this.companyID);
      this.companyName = curCompany.companyName;


      this.http.get(environment.mainApi+'GetCIOHistoryBetweenDate?fromdate='+this.global.dateFormater(this.fromDate,'-')+
      '&todate='+this.global.dateFormater(this.toDate,'-')).subscribe(
        (Response:any)=>{console.log(Response);
  
  
        
          this.reportData = Response.filter((obj:any)=>obj.companyName == this.companyID);
        
  
          this.TotalAmount = 0;
  
          this.reportData.forEach((e:any) => {
           
            
            this.TotalAmount += (e.rentPerDay * e.totalDays) + (e.servicesTotalAmount);
  
          });
          
          this.app.stopLoaderDark();
        },
        (Error:any)=>{
          this.app.stopLoaderDark();
        }
      )
    }

    

  }

  getReport2(){
    if(this.companyID == '' || this.companyID == undefined){
      this.msg.WarnNotify('Select Company')
    }else{
      this.app.startLoaderDark();

      var curCompany = this.companyList.find((a:any)=>a.companyName == this.companyID);
      this.companyName = curCompany.companyName;


      this.http.get(environment.mainApi+'GetCIOHistoryBetweenDate2?fromdate='+this.global.dateFormater(this.fromDate,'-')+
      '&todate='+this.global.dateFormater(this.toDate,'-')).subscribe(
        (Response:any)=>{
  
  
        
          this.reportData = Response.filter((obj:any)=>obj.companyName == this.companyID);
        
  
          this.TotalAmount = 0;
  
          this.reportData.forEach((e:any) => {
           
            
            this.TotalAmount += (e.rentPerDay * e.totalDays) + (e.servicesTotalAmount);
  
          });
          
          this.app.stopLoaderDark();
        },
        (Error:any)=>{
          this.app.stopLoaderDark();
        }
      )
    }

    

  }



  getDetails(row:any){
    this.dialogue.open(CioDetailsComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe(val=>{
     
      
    })
  }


  print(){
    this.global.printData('#printDiv');
  }


}