import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  
  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule,
    private app:AppComponent
    
    ){}
  ngOnInit(): void {
    this.getCategory();
  }

  categoryList:any;


  OpenDialogue(){
    this.dialogue.open(AddCategoryComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getCategory();
      }
      
    })
  }



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

  editCategory(row:any){

    this.dialogue.open(AddCategoryComponent,{
      width:"40%",
      data:row

    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getCategory();
      }
      
    })

  }

  deleteCategory(row:any){
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
        this.app.startLoaderDark();

        //////on confirm button pressed the api will run
        this.http.post(environment.mainApi+'DeleteCatagory',{
          CategoryID:row.categoryID,
          UserID:this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              
              this.getCategory();
              this.app.stopLoaderDark();
            }else{
              this.msg.WarnNotify(Response.msg);
              this.app.stopLoaderDark();
            }
          }
        )
      }
    });
  }




}
