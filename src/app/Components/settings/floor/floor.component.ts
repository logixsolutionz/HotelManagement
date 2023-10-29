import { Component, OnInit } from '@angular/core';
import { AddFloorComponent } from './add-floor/add-floor.component';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit{


  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule,
    private app:AppComponent
    
    ){}
  ngOnInit(): void {

    
    this.getFloor();
    
  }

  floorData:any[]= [];

  getFloor(){
    this.http.get(environment.mainApi+'GetFloor').subscribe(
      (Response:any)=>{
        this.floorData = Response;
      },
      (Error)=>{
        this.msg.WarnNotify('Error Occured While Loading Data');
      }
    )
  }


  OpenDialogue(){
    this.dialogue.open(AddFloorComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getFloor();
      }
    })
}


editFloor(row:any){
  
  this.dialogue.open(AddFloorComponent,{
    width:"40%",
    data:row
  }).afterClosed().subscribe({
    next:value=>{
      if(value == "Update"){
        this.getFloor();
      }
    }
  })
}


deleteFloor(row:any){


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
      this.http.post(environment.mainApi+'DeleteFloor',{
        FloorID: row.floorID,
        UserID: this.globaldata.getUserID(),
      }).subscribe(
        (Response:any)=>{
          if(Response.msg== 'Data Deleted Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.getFloor();
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
