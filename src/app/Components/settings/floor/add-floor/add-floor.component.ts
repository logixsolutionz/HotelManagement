import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrls: ['./add-floor.component.scss']
})
export class AddFloorComponent implements OnInit{

  
  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<AddFloorComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService,
   
  ){

  }
  ngOnInit(): void {
    
    if(this.editData){
      this.floorName = this.editData.floorName;
      this.actionbtn = 'Update';
    }
  }


  floorName:any;
  actionbtn = 'Save';


  save(){
    if(this.floorName == '' || this.floorName == undefined){
      this.msg.WarnNotify('Enter Floor Name');
    }else{
      if(this.actionbtn == 'Save'){
        this.insert();
      }else if(this.actionbtn == 'Update'){
        this.update();
      }
    }
  }


  insert(){
    $(".loaderDark").show()
    this.http.post(environment.mainApi+'InsertFloor',{
      FloorName: this.floorName,
      UserID: this.global.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          $(".loaderDark").fadeOut(500);
          this.dialogRef.close('Update');
        }else{
          this.msg.WarnNotify(Response.msg);
          $(".loaderDark").fadeOut(500);
        }
      }
    )

  }

  update(){
    $(".loaderDark").show()
    this.http.post(environment.mainApi+'UpdateFloor',{
      FloorID: this.editData.floorID,
    FloorName: this.floorName,
    UserID: this.global.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          $(".loaderDark").fadeOut(500);
          this.reset();
          this.dialogRef.close('Update');
        }else{
          this.msg.WarnNotify(Response.msg);
          $(".loaderDark").fadeOut(500);
        }
      }
    )
  }


  reset(){
    this.floorName = '';
    this.actionbtn = 'Save';
  }


  closeDialogue(){
    this.dialogRef.close();
  }


}
