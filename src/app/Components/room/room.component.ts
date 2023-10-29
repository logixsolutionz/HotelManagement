import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { AddRoomComponent  } from './add-room/add-room.component';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
 


  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule,
    
    
    ){}
  ngOnInit(): void {
    this.globaldata.setHeaderTitle('Add Room');
    this.getRoom();
  }

    searchtxt:any;

    RoomData:any;


  OpenDialogue(){
    this.dialogue.open(AddRoomComponent,{
      width:"50%",

    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getRoom();
      }
     
    })
  }


  getRoom(){
    this.http.get(environment.mainApi+'GetRoom').subscribe(
      (Response:any)=>{
        this.RoomData = Response;
      }
    )

  }


  editRoom(row:any){
    this.dialogue.open(AddRoomComponent,{
      width:"50%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getRoom();
      }
     
    })
  }


  deleteRoom(row:any){

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
        
        $('.loaderDark').show();
        //////on confirm button pressed the api will run
        this.http.post(environment.mainApi+'deleteRoom',{
          roomID:row.roomID,
          userID:this.globaldata.getUserID()
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getRoom();
              $('.loaderDark').fadeOut(500);
            }else{
              this.msg.WarnNotify(Response.msg);
              $('.loaderDark').fadeOut(500);
            }
          }
        )
      }
    });

   

  }


}
