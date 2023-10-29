import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddPromoComponent } from './add-promo/add-promo.component';
import { environment } from 'src/environments/environment.development';
import { AppComponent } from 'src/app/app.component';
import { error } from 'jquery';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-promo-rates',
  templateUrl: './promo-rates.component.html',
  styleUrls: ['./promo-rates.component.scss']
})
export class PromoRatesComponent implements OnInit {
  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule,
    private app:AppComponent
    
    ){}
  ngOnInit(): void {

    this.getPromo();
    
  }


  promoList:any = [];


  getPromo(){
    

    this.http.get(environment.mainApi+'getpromo').subscribe(
    (Response)=>{
      this.promoList = Response;
      // console.log(Response);
    }
    )

  }

  deletePromo(row:any){


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

        //////on confirm button pressed the api will run
        this.app.startLoaderDark();
        this.http.post(environment.mainApi+'deletepromo',{
          PromoID: row.promoID,
          UserID: this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getPromo();
              this.app.stopLoaderDark();
            }else{
              this.msg.WarnNotify(Response.msg);
              this.app.stopLoaderDark()
            }
          },
          (error:any)=>{
            console.log(error);
            this.app.stopLoaderDark()
          }
        )
      }
    });


    
  }


  editPromo(row:any){
    this.dialogue.open(AddPromoComponent,{
      width:"30%",
      data: row,

    }).afterClosed().subscribe(val=>{
      this.getPromo();
    })
  
  }

  
  OpenDialogue(){
    this.dialogue.open(AddPromoComponent,{
      width:"30%",

    }).afterClosed().subscribe(val=>{
      this.getPromo();
    })
  }

}