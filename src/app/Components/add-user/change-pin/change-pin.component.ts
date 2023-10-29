import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AddUserComponent } from '../add-user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

import * as $ from 'jquery';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss']
})
export class ChangePinComponent implements OnInit {

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){}



  ngOnInit(): void {

    if(this.editData){
      this.UserID = this.editData.userID;
    }
  
  }

  UserID:any;
  oldPin:any;
  newPin:any;


  changePin(){

    if(this.oldPin == '' || this.newPin == undefined){
      this.msg.WarnNotify('Enter Old Pin')
    }else if(this.newPin == '' || this.newPin == undefined){
      this.msg.WarnNotify('Enter New Pin')
    }else{
      $('.loaderDark').show();
      this.http.post(environment.mainApi+'updatepin',{
      
        OldPin: this.oldPin,
        PinCode: this.newPin,
        UserID: this.UserID,
        reqUserID:this.global.getUserID(),
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
    
          }
        )
    }

   
  }

  close(){
    this.dialogRef.close();
  }


}
