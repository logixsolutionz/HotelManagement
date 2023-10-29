import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-list-of-companies',
  templateUrl: './list-of-companies.component.html',
  styleUrls: ['./list-of-companies.component.scss']
})
export class ListOfCompaniesComponent implements OnInit {


  

    logo:any;
    logo1:any;
    CompanyName:any;
   CompanyName2:any;
   companyAddress :any;
   companyPhone :any;
   companyMobileno:any;
   companyEmail:any;
   
   


  constructor(
    private http:HttpClient,
    private global:GlobalDataModule,
    private app:AppComponent,
    private msg:NotificationService

    
  ){}
  
  ngOnInit(): void {

    this.global.setHeaderTitle('List of Companies');
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.CompanyName = this.global.CompanyName;
    this.CompanyName2 = this.global.CompanyName2;
    this.companyAddress = this.global.Address;
    this.companyPhone = this.global.Phone;
    this.companyMobileno = this.global.mobileNo;
    this.companyEmail = this.global.Email;
    this.getCompanies();
   
  }



  partyList:any;
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



  print(){
    this.global.printData('#printRpt');
  }

}
