import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

import * as $ from 'jquery';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{

  
  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(): void {
    
    if(this.editData){
      this.categoryName = this.editData.categoryName;
      this.actionbtn = 'Update';
    }
  }


  categoryName:any;
  actionbtn = 'Save';




  save(){
    if(this.categoryName == '' || this.categoryName == undefined){
      this.msg.WarnNotify('Enter The Category Name');
    }else{
      if(this.actionbtn == 'Save'){
        this.insert();
      }else if(this.actionbtn == 'Update'){
        this.update();
      }
    }
  }


  insert(){
     $(".loaderDark").show();
    this.http.post(environment.mainApi+'InsertCatagory',{
      CategoryName:this.categoryName,
    UserID: this.global.getUserID()
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
    this.http.post(environment.mainApi+'UpdateCatagory',{
      CategoryID: this.editData.categoryID,
      CategoryName:this.categoryName,
      UserID: this.global.getUserID()
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
    this.categoryName = '';
    this.actionbtn = 'Save';
  }


  closeDialogue(){
    this.dialogRef.close();
  }


}
