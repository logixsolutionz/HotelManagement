import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

import * as $ from 'jquery';

@Component({
  selector: 'app-room-status',
  templateUrl: './room-status.component.html',
  styleUrls: ['./room-status.component.scss']
})
export class RoomStatusComponent implements OnInit {


  
  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<RoomStatusComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(): void {
    this.getRoomStatus();
    this.currentStausID = this.editData.roomCrntStatusID;
    this.curRoomTitle = this.editData.roomTitle;
  }

  currentStausID:any;
  curRoomTitle:any;
  statusID:any;
  statusList:any = [];

  getRoomStatus(){
    this.http.get(environment.mainApi+'getroomstatus').subscribe(
      (Response)=>{
        this.statusList = Response;
        // console.log(Response);

      }
    )
  }

  closeDialogue(){
    this.dialogRef.close();
  }


  saveStatus(){

    if(this.statusID == '' || this.statusID == undefined){
      this.msg.WarnNotify('Select Status')
    }else{
      $('.loaderDark').show();

      this.http.post(environment.mainApi+'changeRoomStatus',{
        roomID:this.editData.roomID,
        roomCrntStatusID:this.statusID,
        userID:this.global.getUserID()
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Updated Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.dialogRef.close('Update');
            $('.loaderDark').fadeOut(500);
          }else{
            this.msg.WarnNotify(Response.msg);
            $('.loaderDark').fadeOut(500);
          }
        },
        (Error)=>{
          $('.loaderDark').fadeOut(500);
        }
      )
    }

    
  }


}
