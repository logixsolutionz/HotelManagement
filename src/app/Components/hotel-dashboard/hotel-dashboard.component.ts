import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { Chart } from 'angular-highcharts';
import { Highcharts } from 'highcharts/highcharts-more.src';


import * as $ from 'jquery';
import * as highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { RoomStatusComponent } from './room-status/room-status.component';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-hotel-dashboard',
  templateUrl: './hotel-dashboard.component.html',
  styleUrls: ['./hotel-dashboard.component.scss']
})
export class HotelDashboardComponent implements OnInit {


  curDate:Date = new Date();

  constructor(
    private globalData :GlobalDataModule,
    private http:HttpClient,
    private dialogue: MatDialog,
    private msg:NotificationService,
    private app:AppComponent
  ){}

  ngOnInit(): void {
    


    this.globalData.setHeaderTitle('Hotel DashBoard');

    // this.getBookings();
    // this.getCheckInOut();
    this.getRoom();
    this.getArrValue();   
    this.getMonthlyBookings();  
    
  }

  bookingTableIcons:any = 'pan_tool';
  roomStatusTableIcon:any = 'add';

  arrColor: ThemePalette = 'accent';
  arrModel: ProgressSpinnerMode = 'determinate';
  arrValue = 70;
  
  searchRoom:any = 0;
  statusList:any = [{id:0 ,title:'All'} ,
   {id:1 ,title:'On Rent'} ,
   {id:2 ,title:'Empty'} , 
   {id:3 ,title:'Cleaning'} , 
   {id:4 ,title:'Personal Use'} ,
    {id:5 ,title:'Out Of Order'}]

  totalBookings:any = 0;
  pendingBookings:any = 0;
  totalCheckIn:any = 0;
  totalCheckOut:any = 0;

  reuseRoomList:any = [];
  roomsList:any = [];
  totalRooms:any = 0;
  checkInRooms:any = 0;
  daysOfMonth:any;
  BookingTableDate:any = new Date();
  bookingTableList:any = [];

  daysList:any;


  ////////////////////////////////////////////////////

  onStatusSelected(){
    this.app.startLoaderDark();
    
    if(this.searchRoom == 0){
      this.roomsList = this.reuseRoomList;
      this.app.stopLoaderDark();
    }else{

      this.roomsList = this.reuseRoomList.filter((e:any)=>e.roomCrntStatusID == this.searchRoom);
      this.app.stopLoaderDark();
    }
    this.app.stopLoaderDark();
    
  }

  ////////////////////////////////////////////////////

  roomStautsTable(event:any):any{

    if(event.roomCrntStatusID == 1){
      this.roomStatusTableIcon = 'hotel';
      return 'checkInBtn';

    }

    if(event.roomCrntStatusID == 2){
      this.roomStatusTableIcon = 'meeting_room';
      return 'emptyBtn';

    }

    if(event.roomCrntStatusID == 3){
      this.roomStatusTableIcon = 'cleaning_services';
      return 'cleanBtn';

    }

    if(event.roomCrntStatusID == 4){
      this.roomStatusTableIcon = 'person_outline';
      return 'personalUseBtn';

    }

    if(event.roomCrntStatusID == 5){
      this.roomStatusTableIcon = 'no_meeting_room';
      return 'outOfOrderBtn';

    }

  }

  ////////////////////////////////////////////////////

  getMonthlyBookings(){

    this.app.startLoaderDark();
    
    // alert(this.globalData.dateFormater(this.BookingTableDate,'-'))
    this.http.get(environment.mainApi+'monthlydashboard?todate='+this.globalData.dateFormater(this.BookingTableDate,'-')).subscribe(
      (Response)=>{
        this.bookingTableList = Response;
        // console.log(Response);
        this.getRoom();
        this.getBookings();
        this.getCheckInOut();
        this.app.stopLoaderDark();
      }
    )
  }

  ////////////////////////////////////////////////////

  BookingTableClass(event:string):any{

    if(event == 'E'){
      this.bookingTableIcons = 'indeterminate_check_box';
      return 'eColor';
      
    }

    if(event == 'C'){
      this.bookingTableIcons = 'hotel';
      return 'cColor';
    }

    if(event == 'B'){
      this.bookingTableIcons = 'contact_phone';
      return 'bColor';
    }

    

  }

  ////////////////////////////////////////////////////

  getBookings(){
    this.http.get(environment.mainApi+'getbooking').subscribe(
    (Response:any)=>{
      
    
      var bookings = Response.filter((e:any)=>e.bookingDate.substring(5,7) == this.BookingTableDate.getMonth()+1  );
      var bookedRooms = Response.filter((e:any)=> e.bookingStatus == 'pending' && e.bookingDate.substring(5,7) == this.BookingTableDate.getMonth()  );

    this.totalBookings = bookings.length;
    this.pendingBookings = bookedRooms.length;
     
    }
    )
  }

  ////////////////////////////////////////////////////

  daysInMonth(month:any, year:any) {
    return new Date(year, month, 0).getDate();
}

////////////////////////////////////////////////////

  
  getCheckInOut(){
    this.http.get(environment.mainApi+'GetCIOHistory').subscribe(
      (Response:any)=>{

        
        var checkOutList = Response.filter((e:any)=>e.activeStatus == false && e.checkInDate.substring(5,7) ==  this.BookingTableDate.getMonth()+1);
        var checkInList = Response.filter((e:any)=>e.checkInDate.substring(5,7) ==  this.BookingTableDate.getMonth()+1);
       
        this.totalCheckIn = checkInList.length;
        this.totalCheckOut = checkOutList.length;
        this.checkInRooms = checkInList.length;
        
      }
    )
   }


   ////////////////////////////////////////////////////

   getRoom(){
    this.http.get(environment.mainApi+'GetRoom').subscribe(
      (Response:any)=>{
        this.reuseRoomList = Response;
        this.roomsList = Response;
        this.totalRooms = Response.length;
        // console.log(Response);
        
        
     this.daysOfMonth = this.daysInMonth(this.BookingTableDate.getMonth()+1,this.BookingTableDate.getFullYear());
    
      this.daysList = [];

      for(var i = 1; i <= this.daysOfMonth; i++){

      this.daysList.push(i);


    }
 
        
      }
    )

  }

  ////////////////////////////////////////////////////

  getArrValue(){
   setTimeout(() => {
    this.arrValue = (this.checkInRooms / this.totalRooms) * 100;
   }, 500);
  }


////////////////////////////////////////////////////

  
  changeRoomStatus(row:any){
    if(row.roomCrntStatusID != 1 ){
      this.dialogue.open(RoomStatusComponent,{
        width:"40%",
        data:row,
  
      }).afterClosed().subscribe(val=>{
        if(val == 'Update'){
          this.getRoom();
        }
        
      })
    }
    }
}
