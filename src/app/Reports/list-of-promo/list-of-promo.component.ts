import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-list-of-promo',
  templateUrl: './list-of-promo.component.html',
  styleUrls: ['./list-of-promo.component.scss']
})
export class ListOfPromoComponent implements OnInit {


  

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

    this.global.setHeaderTitle("List of Promo's");
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.CompanyName = this.global.CompanyName;
    this.CompanyName2 = this.global.CompanyName2;
    this.companyAddress = this.global.Address;
    this.companyPhone = this.global.Phone;
    this.companyMobileno = this.global.mobileNo;
    this.companyEmail = this.global.Email;
    this.getPromo();
   
  }



  partyList:any;
  promoList:any;



  ///////////////////////////////////////////////////////

  getPromo(){
    this.app.startLoaderDark();
    this.http.get(environment.mainApi+'getpromo').subscribe(
      (Response:any)=>{
        this.promoList = Response;
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