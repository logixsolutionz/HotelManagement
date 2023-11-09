import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';
import { AddcheckINServiceComponent } from './addcheck-inservice/addcheck-inservice.component';
import { CheckOutFormComponent } from './check-out-form/check-out-form.component';
import { AddDocumentsComponent } from './add-documents/add-documents.component';
import { CioDetailsComponent } from './cio-details/cio-details.component';
import { AddCustomerComponent } from '../booking/add-customer/add-customer.component';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-check-inout',
  templateUrl: './check-inout.component.html',
  styleUrls: ['./check-inout.component.scss']
})
export class CheckINOUtComponent implements OnInit {
  loadingBar= "start";
  today = new Date();

  page:number = 1;
  count: number = 0;

  tableSize: number = 0;
  tableSizes : any = [];

  onTableDataChange(event:any){

    this.page = event;
    this.getSavedVouchers();
  }

  onTableSizeChange(event:any):void{
    this.tableSize = event.target.value;
    this.page =1 ;
    this.getSavedVouchers();
  }

  curDate = new Date();

  lblVoucherPrintDate= new Date();
    logo:any;
    logo1:any;
    CompanyName :any;
     CompanyName2:any;
     companyAddress :any;
    companyPhone :any;
    companyMobileno:any;
    companyEmail:any;

  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private global:GlobalDataModule,
    private app:AppComponent,
    private dialogue: MatDialog,
  ){

  }



  voucherTypesList:any = [{title:'Check In'},{title:'Check Out'}];
  voucherType:any = 'Check In';


  ngOnInit(): void {
    this.global.setHeaderTitle('Check IN OUt');
    this.RoleID = this.global.getRoleId();
   
    this.getBookingsList();
    this.getCompanyPromo();
    this.getRoom();
    this.getParty();
    this.getServices();
    this.getCoaList();
    this.getSavedVouchers();
    this.getTotalDays();
    

    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.CompanyName = this.global.CompanyName;
    this.CompanyName2 = this.global.CompanyName2;
    this.companyAddress = this.global.Address;
    this.companyPhone = this.global.Phone;
    this.companyMobileno = this.global.mobileNo;
    this.companyEmail = this.global.Email;
    this.tableSize = this.global.paginationDefaultTalbeSize;
    this.tableSizes = this.global.paginationTableSizes; 
    
  }


  numberOnly(val:any){
    return  this.global.avoidMinus(val);
   
  }


  RoleID:any;

  searchText:any;

  bookingSearch:any;
  coaSearch:any;
  roomSearch:any;
  partySearch:any;
  bookingID:number = 0;
  roomID:number = 0;
  partyID:number = 0;
  rentPerDay:number = 0;
  checkInDate:any = this.today;
  checkInTime:any = this.today.getHours() + ":" + this.today.getMinutes() ;
  checkOutDate:any = this.today;
  checkOutTime:any = this.today.getHours() + ":" + this.today.getMinutes()  ;
  totalDays:any = 0;
  estimatedDays:any = 0;
  advanceAmount:any = 0;
  bookingAdvance:any = 0;
  familyInfo:any;
  cioRemarks:any;
  coaID:number = 0;
  discountPercentage:number = 0;
  companyPromoID:number = 0;
  discountedRPD:number = 0;


  billTotal:number = 0;

  /////////////////////////////////


  lblVoucherNo:any;
  lblBookingID:any;
  lblAdvancePaid:any;
  lblBalanceAmont:any;
  lblDiscount:any;
  lblArrivalDate:any;
  lblDepartureDate:any;
  lblPartyName:any;
  lblPartyCNIC:any;
  lblPartyMobileno:any
  lblServicesAmount:any;
  lblRoomNo:any;
  lblTotalDays:any;
  lblRentPerDay:any;
  lblActiveStatus:any;
  lblCIORemarks:any;
  lblCompanyName:any;
  lblPromoTitle:any;
  lblDiscountPercentage:any;
  lblrpDwithoutDP:any;

  lblServiceList:any = [];



  ///////////////////////////////////////

  serviceSearch:any;
  serviceID:any;
  serviceCharges:any;
  quantity:any;
  amountCharged:any;
  serviceDate:any = new Date();
  serviceTime:any = this.today.getHours() + ":" + this.today.getMinutes();
  servicesTotalAmount:any = 0;





  //////////////////////////////////


  bookingList:any = [];
  roomList:any = [];
  partyList:any = [];
  servicesList:any = [];
  coaList:any = [];

  savedVoucherList:any = [];
  checkInOutList:any =[];



  serviceTableList:any= [];

  SavedCheckINData:any = [];
  savedCheckOutData:any = [];



  promoSearch:any;
  companyPromoList:any = [];



  onPromoChange(){
    
    const curpromo = this.companyPromoList.find((e:any)=>e.companyPromoID == this.companyPromoID);
    this.discountPercentage = curpromo.discountPercentage;


    this.discountedRPD = (this.rentPerDay - (this.rentPerDay * this.discountPercentage)/100);
    

  }

  /////////////////////////////////////////////////////////////

  getCompanyPromo(){
    this.app.startLoaderDark();
    
    this.http.get(environment.mainApi+'getcompanypromo ').subscribe(
      (Response)=>{

        this.companyPromoList = Response;
        this.app.stopLoaderDark();
      

      },
      (error:any)=>{
        this.app.stopLoaderDark();
      }
    )
  }

//////////////////////////////////////////////////////////////

  getBookingsList(){
    this.http.get(environment.mainApi+'getbooking').subscribe(
    (Response:any)=>{

      if(Response != ''){
        this.bookingList =Response.filter((e:any)=>e.bookingStatus == 'Confirmed');
      }
     
      // console.log(this.bookingList);
    },
    (Error)=>{
      this.msg.WarnNotify('Error Occured While Loading Booking List');
    }
    )
  }


 //////////////////////////////////////////////////////////////

 getTotalDays(){
  
  var totalHours:any = this.global.getHours(this.global.dateFormater(this.checkInDate,'-'),this.checkInTime,this.global.dateFormater(this.checkOutDate,'-'),this.checkOutTime);

 //  this.totalDays = totalHours / 24 ;
  var days:any = totalHours / 24 ;

  var firstNumber = parseInt(days);
  var secondNumber = parseFloat(days);

  var differce:any = (secondNumber - firstNumber).toString().substring(2,4) ;

  if(differce < '5' && differce > '0'){
   this.totalDays = Math.round(days) + 1;
  }else {
   this.totalDays = Math.round(days);
  }

  this.getTotal();

 }


  //////////////////////////////////////////////////////////////

  getRoom(){
    this.http.get(environment.mainApi+'GetRoom').subscribe(
      (Response:any)=>{
        this.roomList = Response;
      //  console.log(Response);
      }
    )

  }


  //////////////////////////////////////////////////////////////
  
  getParty(){
    this.http.get(environment.mainApi+'getparty').subscribe(
    {
      next:(value:any) =>{
        this.partyList = value;
        
      
      }      
      
      
    }
    )
  }


  //////////////////////////////////////////////////////////////

  getTotal(){

    this.billTotal = ((this.rentPerDay - (this.rentPerDay * this.discountPercentage /100) ) * this.totalDays ) + this.servicesTotalAmount;
    
  }
  


  //////////////////////////////////////////////////////////////
  getServices(){
    this.http.get(environment.mainApi+'getservice').subscribe(
     {
       next:value=>{
         this.servicesList = value;
         // console.log(value);
       }
     }
    ) 
   }
 


   //////////////////////////////////////////////////////////////

   onServiceSeleted(){
    var curService = this.servicesList.find((e:any)=>e.serviceID == this.serviceID);

   

    this.amountCharged = curService.serviceCharges;
   }



   //////////////////////////////////////////////////////////////

   addService(){ 
    var curRow = this.serviceTableList.find((obj:any)=> obj.ServiceID == this.serviceID);
    if(curRow == undefined){       
      var curService = this.servicesList.find((e:any)=>e.serviceID == this.serviceID);
      var serviceTitle = curService.serviceTitle;
      var serviceCharges = curService.serviceCharges;
   
      this.serviceTableList.push({ServiceID: this.serviceID,serviceTitle:serviceTitle, ServiceDate:this.global.dateFormater(this.serviceDate,'-'), 
        ServiceTime:this.serviceTime, ServiceCharges:serviceCharges, Quantity:this.quantity, AmountCharged:this.amountCharged});

      this.serviceTableList.forEach((e:any) => {
        this.servicesTotalAmount = 0;
        this.servicesTotalAmount += e.AmountCharged * e.Quantity;
      });
  
      this.getTotal();
    
      this.serviceID = 0;
      this.serviceCharges = '';
      this.quantity = '';
      this.amountCharged = '' ;


    

    }else if(curRow.ServiceID == this.serviceID){
   
      this.msg.WarnNotify('Service Already Entered');
    }


    
    
   


   }


   //////////////////////////////////////////////////////////////

   deleteService(item:any){
    
    var index = this.serviceTableList.indexOf(item);
    this.serviceTableList.splice(index,1);

   }


   //////////////////////////////////////////////////////////////

   getCoaList(){
    this.http.get(environment.mainApi+'GetCashBankCOA').subscribe(
      (Response)=>{
    
        this.coaList = Response;
        
      }
    )
  }


  //////////////////////////////////////////////////////////////

  reset(){
    
   this.bookingID = 0;
    this.roomID = 0;
    this.partyID = 0;
    this.rentPerDay = 0;
    this.checkInDate = new Date();
    this.checkInTime = this.today.getHours() + ":" + this.today.getMinutes();
    this.checkOutTime = this.today.getHours() + ":" + this.today.getMinutes();
    this.checkOutDate = new Date();
    this.totalDays = 0;
    this.estimatedDays = 0;
    this.advanceAmount = 0;
    this.bookingAdvance = 0;
    this.familyInfo = '';
    this.cioRemarks = '';
    this.coaID = 0;
    this.billTotal = 0;
    this.servicesTotalAmount = '';
    this.serviceTableList = [];
    this.discountPercentage = 0;
    this.companyPromoID = 0;
    this.discountedRPD = 0;

  }


  //////////////////////////////////////////////////////////////
  onRoomChange(){
   
    
    var curRoom  = this.roomList.find((e:any)=>e.roomID == this.roomID);
    this.rentPerDay = curRoom.rentPerDay;
    this.bookingID = 0;
    this.partyID = 0;
    this.bookingAdvance = 0;

   
    
  }


  //////////////////////////////////////////////////////////////


  onBookingChange(){
    var curBooking = this.bookingList.find((e:any)=>e.bookingID == this.bookingID);
   

    this.roomID = curBooking.roomID;
    this.bookingAdvance = curBooking.advancePaid;
    this.partyID = curBooking.partyID;
    this.rentPerDay = curBooking.rentPerDay;
 
    
  }


  //////////////////////////////////////////////////////////////

  saveCheckIN(){    

    var hoursDifferece:any = this.global.getHours(this.global.dateFormater(this.checkInDate,'-'),this.checkInTime,
    this.global.dateFormater(this.checkOutDate,'-'),this.checkOutTime);

    if(this.roomID == 0 || this.roomID == undefined){
      this.msg.WarnNotify('Select Room');
    }else if(this.partyID == 0 || this.partyID == undefined){
      this.msg.WarnNotify('Select Customer Name')
    }else if(this.checkInDate == '' || this.checkInDate == undefined){
      this.msg.WarnNotify('Select Check In Date')
    }else if(this.checkInTime == '' || this.checkInTime == undefined){
      this.msg.WarnNotify('Enter Check In Time')
    }else if(this.rentPerDay == 0 || this.rentPerDay  == undefined){
      this.msg.WarnNotify('Enter Rent Per Day')
    }else if(this.totalDays == '' || this.totalDays == undefined){
      this.msg.WarnNotify('Enter Total Days')
    }else if(this.estimatedDays == '' || this.estimatedDays == undefined){
      this.msg.WarnNotify('Enter Estimates Days of Stay')
    }else if(this.checkOutDate == '' || this.checkOutDate == undefined){
      this.msg.WarnNotify('Select Check Out Date')
    }else if(this.checkOutTime == '' || this.checkOutTime == undefined){
      this.msg.WarnNotify('Enter Check Out Time')
    }else if(hoursDifferece < 6 ){
      this.msg.WarnNotify('Departure Date is not Valid')
    }else if(this.advanceAmount > this.billTotal){
      this.msg.WarnNotify('Advance Amount is more Than Bill Amount')
    }
    else if(this.advanceAmount > 0 && this.coaID == 0){
      this.msg.WarnNotify('Select Payment Head')
    }
    else if((this.discountedRPD == 0 || this.discountedRPD == undefined) && this.companyPromoID != 0){
      this.msg.WarnNotify('Enter DRPD');
    }
    else{

      if(this.cioRemarks == '' || this.cioRemarks == undefined){
        this.cioRemarks = '-';
      }

      if(this.familyInfo == '' || this.familyInfo == undefined){
        this.familyInfo = '-';
      }

      this.insertCheckIn();
    }
  }


  //////////////////////////////////////////////////////////////

   insertCheckIn(){    

    this.app.startLoaderDark();
    if(this.companyPromoID == 0 || this.companyPromoID == undefined){
      this.discountedRPD = this.rentPerDay;
    }
    this.http.post(environment.mainApi+'insertcheckin',{
      RoomID:this.roomID,
      PartyID:this.partyID,
      BookingID:this.bookingID,
      CheckInDate:this.global.dateFormater(this.checkInDate,'-'),
      CheckInTime: this.checkInTime,
      CheckOutTime:this.checkOutTime,
      CheckOutDate:this.checkOutDate,
      RentPerDay: this.discountedRPD,
      TotalDays:this.totalDays,
      EstimatedDays:this.estimatedDays,
      CioRemarks: this.cioRemarks,
      FamilyInfo: this.familyInfo,
      AdvancePaid: this.advanceAmount,
      BookingAdvancePaid: this.bookingAdvance,
      COAID:this.coaID,
      CompanyPromoID:this.companyPromoID,	
      DiscountPercentage:this.discountPercentage,		
      RPDwithoutDP:this.rentPerDay,	
      CioDetail:JSON.stringify(this.serviceTableList),
      UserID: this.global.getUserID()
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.getSavedVouchers();
          this.getRoom();
          this.getBookingsList();
          this.reset();
          this.app.stopLoaderDark();
        }else{
          this.msg.WarnNotify(Response.msg);
          this.app.stopLoaderDark();
          
        }
      },
      (Error:any)=>{
        console.log(Error); 
        this.app.stopLoaderDark();
      }
    )
   }


   //////////////////////////////////////////////////////////////

   filterSavedVouchers(){
    
    if(this.voucherType == 'Check In'){
      this.checkInOutList = this.savedVoucherList.filter((e:any)=>e.activeStatus == true);
    }else if(this.voucherType == 'Check Out'){
      this.checkInOutList = this.savedVoucherList.filter((e:any)=>e.activeStatus == false);
    }

   }


   //////////////////////////////////////////////////////////////

   getSavedVouchers(){
    this.http.get(environment.mainApi+'GetCIOHistory').subscribe(
      (Response:any)=>{

        this.savedVoucherList = Response;
        console.log(Response);
        this.checkInOutList = Response.filter((e:any)=>e.activeStatus == true);
        this.loadingBar = 'Stop';
       

       // console.log(Response);
        
      }
    )
   }

//////////////////////////////////////////////////////////////

   addNewService(row:any){
    this.dialogue.open(AddcheckINServiceComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getSavedVouchers();
      }
      
    })
   }


   //////////////////////////////////////////////////////////////

   checkOut(row:any){
    this.dialogue.open(CheckOutFormComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getSavedVouchers();
      }
      
    })
   }


   //////////////////////////////////////////////////////////////

   addDocuments(row:any){
    this.dialogue.open(AddDocumentsComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getSavedVouchers();
      }
      
    })
   }


   //////////////////////////////////////////////////////////////
   
  getCheckInOutDetails(row:any){
    // console.log(row);

    this.lblVoucherNo = row.checkinoutID;
    this.lblBookingID = row.bookingID;
    this.lblAdvancePaid = row.advancePaid;
    this.lblBalanceAmont = row.balanceAmount;
    this.lblArrivalDate = row.checkInDate;
    this.lblDepartureDate = row.checkOutDate;
    this.lblPartyName = row.partyName;
    this.lblPartyCNIC = row.partyCNIC;
    this.lblPartyMobileno = row.partyMobileNo;
    this.lblDiscount = row.discount;
    this.lblServicesAmount = row.servicesTotalAmount;
    this.lblRoomNo  = row.roomTitle;
    this.lblTotalDays = row.totalDays;
    this.lblRentPerDay = row.rentPerDay;
    this.lblActiveStatus = row.activeStatus;
    this.lblCIORemarks = row.cioRemarks;
    this.lblCompanyName =  row.companyName;
    this.lblPromoTitle = row.promoTitle;
    this.lblDiscountPercentage =  row.discountPercentage;
    this.lblrpDwithoutDP = row.rpDwithoutDP;

    this.http.get(environment.mainApi+'GetRoomServices?cioid='+row.checkinoutID).subscribe(
      (Response)=>{

        
        this.lblServiceList = Response;
        
      }
    )


    

  }


  //////////////////////////////////////////////////////////////

  getCioVoucherDetails(row:any){
    this.dialogue.open(CioDetailsComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getSavedVouchers();
      }
      
    })
  }



  //////////////////////////////////////////////////////////////

   print(row:any){



    this.getCheckInOutDetails(row);


   setTimeout(() => {
    this.global.printData('#printDiv');
   }, 1000);
   }

   ///////////////////////////////////////////


   printCIO(row:any){
    // console.log(row);
    this.getCheckInOutDetails(row);


    setTimeout(() => {
     this.global.printData('#print2');
    }, 1000);
   }



   addCustomer(){
    this.dialogue.open(AddCustomerComponent,{
      width:"60%",
      data: 'booking page'

    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getParty();

            
      }
      
    })
  }


  AddPayment(row:any){
    this.dialogue.open(PaymentComponent,{
      width:"40%",
      data: row

    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getSavedVouchers();

            
      }
      
    })
  }


}
