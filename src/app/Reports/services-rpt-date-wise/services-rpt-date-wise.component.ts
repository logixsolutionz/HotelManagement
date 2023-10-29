import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CioDetailsComponent } from 'src/app/Components/check-inout/cio-details/cio-details.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-services-rpt-date-wise',
  templateUrl: './services-rpt-date-wise.component.html',
  styleUrls: ['./services-rpt-date-wise.component.scss']
})
export class ServicesRptDateWiseComponent  implements OnInit{

  
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
    this.global.setHeaderTitle('Service Rpt DateWise');
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.CompanyName = this.global.CompanyName;
    this.CompanyName2 = this.global.CompanyName2;
    this.companyAddress = this.global.Address;
    this.companyPhone = this.global.Phone;
  }




  fromDate:any = new Date();
  toDate:any = new Date();

  totalQuantity:any = 0;
  totalServiceCharges:any = 0;
  totalAmountCharges:any = 0;
  totalAmount:any = 0;

  
  


  allServicesData:any;


  getReport(){

    this.app.startLoaderDark();

    this.http.get(environment.mainApi+'GetAllServicesDetail?fromdate='+this.global.dateFormater(this.fromDate,'-')+
    '&todate='+this.global.dateFormater(this.toDate,'-')).subscribe(
      (Response:any)=>{
        this.allServicesData = Response;
        
        
        this.totalQuantity =  0;
        this.totalServiceCharges = 0;
        this.totalAmountCharges = 0;
        
        this.totalAmount = 0;


        Response.forEach((e:any) => {
         
          this.totalQuantity +=  e.quantity;
          this.totalServiceCharges += e.serviceCharges;
          this.totalAmountCharges += e.amountCharged;
          
          this.totalAmount += (e.quantity * e.amountCharged);

        });
        
        this.app.stopLoaderDark();
      },
      (Error:any)=>{
        this.app.stopLoaderDark();
      }
    )

  }

  getReport2(){

    this.app.startLoaderDark();

    this.http.get(environment.mainApi+'GetAllServicesDetail2?fromdate='+this.global.dateFormater(this.fromDate,'-')+
    '&todate='+this.global.dateFormater(this.toDate,'-')).subscribe(
      (Response:any)=>{
        this.allServicesData = Response;
        
        
        this.totalQuantity =  0;
        this.totalServiceCharges = 0;
        this.totalAmountCharges = 0;
        
        this.totalAmount = 0;


        Response.forEach((e:any) => {
         
          this.totalQuantity +=  e.quantity;
          this.totalServiceCharges += e.serviceCharges;
          this.totalAmountCharges += e.amountCharged;
          
          this.totalAmount += (e.quantity * e.amountCharged);

        });
        
        this.app.stopLoaderDark();
      },
      (Error:any)=>{
        this.app.stopLoaderDark();
      }
    )

  }



  getDetails(row:any){
    this.dialogue.open(CioDetailsComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe(val=>{
     
      
    })
  }


  print(){
    this.global.printData('#printDiv')

  }

}
