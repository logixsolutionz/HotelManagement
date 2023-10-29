import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';
import { AddcityformComponent } from '../settings/city/addcityform/addcityform.component';
import { error } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit{


  loadingBar = 'start';

  
  page:number = 1;
  count: number = 0;
 
  tableSize: number = 10;
  tableSizes : any = [];

  onTableDataChange(event:any){

    this.page = event;
    this.getCompany();
  }

  onTableSizeChange(event:any):void{
    this.tableSize = event.target.value;
    this.page =1 ;
    this.getCompany();
  }



  constructor(private globalData: GlobalDataModule,
 
    private http : HttpClient,
    private msg : NotificationService,
    private app:AppComponent,
    private dialogue:MatDialog
    ){

  }
  ngOnInit(): void{
   this.globalData.setHeaderTitle('Add Company');
   this.getCityNames();
   this.getCompany();
   this.tableSizes = this.globalData.paginationTableSizes;
  }




  //////////////////////////////////////////////////////
  //////////////////////getting the City Names/////////////////
  //////////////////////////////////////////////////////////////

  CitiesNames : any = []

  getCityNames(){
    this.http.get(environment.mainApi+'getcity').subscribe(
      {
        next : value =>{
          this.CitiesNames = value;
        },
        error : error=>{
          console.log(error);
        }
      }
    )
  }
/////////////////////////////////////////////////////////////////////////




addCity(){
  this.dialogue.open(AddcityformComponent,{
    width:"40%",

  }).afterClosed().subscribe(val=>{
    if(val == 'Update'){
      this.getCityNames();
    }
  })
}




///////getting City Name for the table//////
  getCityName(id:any){

    var curcity = this.CitiesNames.find((e:any)=>{return e.cityID == id});
    return   curcity.cityName;
  }
//////////////////////////////////////////////



citySearch:any;
  searchtxt:any;
  btnType = "Save";
  curCompanyID:any;
  companyName :any;
  mangerName :any;
  companyMobileno:any;
  companyTelephoneNo:any;
  CityID :any;
  companyAddress:any;
  description :any;
 
  validate = true;



  companyList:any = [];

  getCompany(){
    this.http.get(environment.mainApi+'GetCompany').subscribe(
      (Response)=>{
        this.companyList = Response;
        this.loadingBar = 'Stop';
     
      }
    )
  }



  save(){
    if(this.companyName == '' || this.companyName == undefined){
      this.msg.WarnNotify('Enter Company Name')
    }else if(this.mangerName == '' || this.mangerName == undefined){
      this.msg.WarnNotify('Enter Manager Name')
    }else if(this.companyMobileno == '' || this.companyMobileno == undefined){
      this.msg.WarnNotify('Enter Mobile No')
    }else if(this.companyTelephoneNo == '' || this.companyTelephoneNo == undefined){
      this.msg.WarnNotify('Enter Mobile No')
    }else if(this.companyMobileno.length < 12 ){
      this.msg.WarnNotify('Mobile No is not valid')
    }else if(this.companyTelephoneNo.length < 11){
      this.msg.WarnNotify('Telephone No is not valid')
    }else if(this.CityID == '' || this.CityID == undefined){
      this.msg.WarnNotify('Select the City Name')
    }else if(this.companyAddress == '' || this.companyAddress == undefined){
      this.msg.WarnNotify('Enter Address')
    }else{
      
      if(this.description == '' || this.description == undefined){
        this.description = '-';
      }

      if(this.btnType == 'Save'){
        this.insertCompany();
      }else if(this.btnType == 'Update'){
        this.updateCompany();
      }


    }
  }


  insertCompany(){
    this.app.startLoaderDark();
    this.http.post(environment.mainApi+'insertcompany',{
      CompanyName:this.companyName,
      ManagerName: this.mangerName,
      MobileNo: this.companyMobileno,
      TelephoneNo: this.companyTelephoneNo,
      CityID: this.CityID,
      Address: this.companyAddress,
      Remarks: this.description,
      UserID: this.globalData.getUserID()
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.getCompany();
          this.app.stopLoaderDark();
        }else{
          this.msg.WarnNotify(Response.msg);
          this.app.stopLoaderDark();
        }
      },
      (error:any)=>{
        console.log(error);
        this.app.stopLoaderDark();
      }
    )
  }



  updateCompany(){
    this.app.startLoaderDark();
    this.http.post(environment.mainApi+'updatecompany',{
      CompanyID:this.curCompanyID ,
      CompanyName:this.companyName,
      ManagerName: this.mangerName,
      MobileNo: this.companyMobileno,
      TelephoneNo: this.companyTelephoneNo,
      CityID: this.CityID,
      Address: this.companyAddress,
      Remarks: this.description,
      UserID: this.globalData.getUserID()
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.getCompany();
          this.app.stopLoaderDark();
        }else{
          this.msg.WarnNotify(Response.msg);
          this.app.stopLoaderDark();
        }
      },
      (error:any)=>{
        console.log(error);
        this.app.stopLoaderDark();
      }
    )
  }



  editCompany(row:any){
    this.btnType = 'Update';
    this.curCompanyID = row.companyID;
    this.companyName = row.companyName;
    this.mangerName = row.managerName;
    this.companyMobileno = row.mobileNo;
    this.companyTelephoneNo = row.telephoneNo;
    this.CityID = row.cityID;
    this.companyAddress = row.address;
    this.description = row.remarks;

  }


  deleteCompany(row:any){

    Swal.fire({
      title:'Alert!',
      text:'Confirm to Delete the Data',
      position:'center',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button mainApi the api will run
       
    this.app.startLoaderDark();
    this.http.post(environment.mainApi+'deletecompany',{
      CompanyID:row.companyID ,
      UserID: this.globalData.getUserID()
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Deleted Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.getCompany();
          this.app.stopLoaderDark();
        }else{
          this.msg.WarnNotify(Response.msg);
          this.app.stopLoaderDark();
        }
      },
      (error:any)=>{
        console.log(error);
        this.app.stopLoaderDark();
      }
    )
      }
    });

  }

 

  ////////////Mobile no field formate//////////////////////////
  mobileNoFormate(){
    if(this.companyMobileno.length == 4){
      this.companyMobileno = this.companyMobileno + '-';
    }
  }

   ////////////////////to Set Phone No field Formate//////////////
   setPhoneno(){
    if(this.companyTelephoneNo.length == 3){
      this.companyTelephoneNo = this.companyTelephoneNo + '-';
    } 
  }







  reset(){
    this.companyName = '';
    this.mangerName = '';
    this.companyMobileno ='';
    this.companyTelephoneNo = '';
    this.CityID = '';
    this.companyAddress = '';
    this.description = '';
    this.btnType ='Save';
 
  }


}