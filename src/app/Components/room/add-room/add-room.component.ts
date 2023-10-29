import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomComponent } from '../room.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { NavigatorYAxisBreaksOptions } from 'highcharts';

import * as $ from 'jquery';


@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent  implements OnInit{

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<AddRoomComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService,
  ){

  }
  ngOnInit(): void {

   this.getCategory();
   this.getFloor();

   if(this.editData){
    this.CategoryID = this.editData.categoryID;
    this.FloorID = this.editData.floorID;
    this.RoomTitle = this.editData.roomTitle;
    this.RoomCode = this.editData.roomCode;
    this.RentPerDay = this.editData.rentPerDay;
    this.RoomDescription = this.editData.roomDescription;
    this.actionbtn = 'Update';
   }

  }

  actionbtn = 'Save';
  searchCat:any;
  searchfloor:any;

  CategoryID:any;
  FloorID:any;
  RoomTitle: any;
  RoomCode: any;
  RoomDescription: any;
  RentPerDay:any;
    


  categoryList:any;
  floorList:any;

  



  getCategory(){
    this.http.get(environment.mainApi+'GetCatagory').subscribe(
      (Response)=>{
        this.categoryList = Response;
      },
      (Error)=>{
        this.msg.WarnNotify('Error Occured while Loading Categories List');
      }
    )
  }



  getFloor(){
    this.http.get(environment.mainApi+'GetFloor').subscribe(
      (Response:any)=>{
        this.floorList = Response;
      },
      (Error)=>{
        this.msg.WarnNotify('Error Occured While Loading Data');
      }
    )
  }




  Save(){
    if(this.FloorID == '' || this.FloorID == undefined){
      this.msg.WarnNotify('Select Floor Name')
    }else if(this.CategoryID == '' || this.CategoryID == undefined){
      this.msg.WarnNotify('Select Category Name');
      
    }else if(this.RoomTitle == '' || this.RoomTitle == undefined){
      this.msg.WarnNotify('Enter The Room Title')
    }else if(this.RoomCode == '' || this.RoomCode == undefined){
      this.msg.WarnNotify('Enter Room Code')
    }else if(this.RentPerDay == '' || this.RentPerDay == undefined){
      this.msg.WarnNotify('Enter Rent Amount');
    }else{


      if(this.RoomDescription == '' || this.RoomDescription == undefined){
        this.RoomDescription = '-';
      }

      if(this.actionbtn == 'Save'){
        this.insert();
      }else if(this.actionbtn == 'Update'){
        this.update();
      }



    }
  }

  insert(){
$('.loaderDark').show();

    this.http.post(environment.mainApi+'insertroom',{
    CategoryID: this.CategoryID,
    FloorID: this.FloorID,
    RoomTitle: this.RoomTitle,
    RoomCode: this.RoomCode,
    RoomDescription: this.RoomDescription,
    RentPerDay: this.RentPerDay,
    UserID: this.global.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          $('.loaderDark').fadeOut(500);
          this.dialogRef.close('Update');
        }else{
          this.msg.WarnNotify(Response.msg);
          $('.loaderDark').fadeOut(500);
        }
      }
    )

  }


  update(){
    $('.loaderDark').show();

    this.http.post(environment.mainApi+'updateroom',{
    RoomID:this.editData.roomID,
    CategoryID: this.CategoryID,
    FloorID: this.FloorID,
    RoomTitle: this.RoomTitle,
    RoomCode: this.RoomCode,
    RoomDescription: this.RoomDescription,
    RentPerDay: this.RentPerDay,
    UserID: this.global.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          $('.loaderDark').fadeOut(500);
          this.dialogRef.close('Update');
        }else{
          this.msg.WarnNotify(Response.msg);
          $('.loaderDark').fadeOut(500);
        }
      }
    )
  }




  reset(){
   this.CategoryID = '';
  this.FloorID = '';
  this.RoomTitle = '';
  this.RoomCode = '';
  this.RoomDescription = '';
  this.RentPerDay = '';
  this.actionbtn = 'Save';
  }

  closeDialogue(){
    this.dialogRef.close();
  }

}
