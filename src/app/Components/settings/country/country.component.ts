import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddCountryComponent } from './add-country/add-country.component';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit{

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule,
    private app:AppComponent,
    
    ){}
  ngOnInit(): void {
    
    this.getCountry();
  }

  countryList:any;


  OpenDialogue(){
    this.dialogue.open(AddCountryComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getCountry();
      }
    })
  }




  getCountry(){
    this.http.get(environment.mainApi+'getcountry').subscribe(
      (Response)=>{
        this.countryList = Response;
      },
      (Error)=>{
        this.msg.WarnNotify('Error Occured while Loading Countries List')
      }
    )
  }


  editCountry(row:any){
    this.dialogue.open(AddCountryComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getCountry();
      }
    })
  }


  deleteCountry(row:any){
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
        this.http.post(environment.mainApi+'deletecountry',{
          CountryID:row.countryID,
          UserID:this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              
              this.getCountry();
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
