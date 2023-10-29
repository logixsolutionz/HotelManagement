import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CioDetailsComponent } from 'src/app/Components/check-inout/cio-details/cio-details.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-cio-rpt-promowise',
  templateUrl: './cio-rpt-promowise.component.html',
  styleUrls: ['./cio-rpt-promowise.component.scss']
})
export class CioRptPromowiseComponent implements OnInit {


  
 

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
    this.global.setHeaderTitle('Check In Out Report Promowise');
    this.getPromo();
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.CompanyName = this.global.CompanyName;
    this.CompanyName2 = this.global.CompanyName2;
    this.companyAddress = this.global.Address;
    this.companyPhone = this.global.Phone;
  }



  searchPromo:any;
  fromDate:any = new Date();
  toDate:any = new Date();
  promoTitle:any;


  TotalAmount:any;

  reportData:any = [];

 
  promoList:any = [];


  getPromo(){
    

    this.http.get(environment.mainApi+'getpromo').subscribe(
    (Response)=>{
      this.promoList = Response;
      // console.log(Response);
    }
    )
  }




  getReport(){
    if(this.promoTitle == '' || this.promoTitle == undefined){
      this.msg.WarnNotify('Select Company')
    }else{
      this.app.startLoaderDark();



      this.http.get(environment.mainApi+'GetCIOHistoryBetweenDate?fromdate='+this.global.dateFormater(this.fromDate,'-')+
      '&todate='+this.global.dateFormater(this.toDate,'-')).subscribe(
        (Response:any)=>{console.log(Response);
  
  
        
          this.reportData = Response.filter((obj:any)=>obj.promoTitle == this.promoTitle);
        
  
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
    if(this.promoTitle == '' || this.promoTitle == undefined){
      this.msg.WarnNotify('Select Company')
    }else{
      this.app.startLoaderDark();

      this.http.get(environment.mainApi+'GetCIOHistoryBetweenDate2?fromdate='+this.global.dateFormater(this.fromDate,'-')+
      '&todate='+this.global.dateFormater(this.toDate,'-')).subscribe(
        (Response:any)=>{
  
  
        
          this.reportData = Response.filter((obj:any)=>obj.promoTitle == this.promoTitle);
        
  
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