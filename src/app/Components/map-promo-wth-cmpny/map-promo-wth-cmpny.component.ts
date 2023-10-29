import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { MappingFormComponent } from './mapping-form/mapping-form.component';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { erase } from 'highcharts';
import { error } from 'jquery';

@Component({
  selector: 'app-map-promo-wth-cmpny',
  templateUrl: './map-promo-wth-cmpny.component.html',
  styleUrls: ['./map-promo-wth-cmpny.component.scss']
})
export class MapPromoWthCmpnyComponent implements OnInit {

  loadingBar = 'start';


  page:number = 1;
  count: number = 0;
 
  tableSize: number = 0;
  tableSizes : any = [];

  onTableDataChange(event:any){

    this.page = event;
    this.getCompanyPromo();
  }

  onTableSizeChange(event:any):void{
    this.tableSize = event.target.value;
    this.page =1 ;
    this.getCompanyPromo();
  }
  

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule,
    private app:AppComponent
    
    
    ){}
  ngOnInit(): void {
    this.globaldata.setHeaderTitle('Map Promo With Company');
    this.getCompanyPromo();

    
    this.tableSize = this.globaldata.paginationDefaultTalbeSize;
    this.tableSizes = this.globaldata.paginationTableSizes;
  }



  searchtxt:any;

  companyPromoList:any = [];


  /////////////////////////////////////////////////////////////

  getCompanyPromo(){
    this.app.startLoaderDark();
    
    this.http.get(environment.mainApi+'getcompanypromo ').subscribe(
      (Response)=>{

        this.companyPromoList = Response;
        this.app.stopLoaderDark();
      

      },
      (error:any)=>{
        this.app.stopLoaderDark();
      }
    )
  }





  /////////////////////////////////////////////////////////////


  deleteCompanyPromo(row:any){

    
    Swal.fire({
      title:'Alert!',
      text:'Confirm to Delete the Data',
      position:'center',
      icon:'warning',
      iconColor:'',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){
        this.app.startLoaderDark();
        //////on confirm button pressed the api will run
        this.http.post(environment.mainApi+'DeleteCompanyPromo',{
          CompanyPromoID:row.companyPromoID,
          UserID: this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getCompanyPromo();
              this.app.stopLoaderDark();
            }else{
              this.msg.WarnNotify(Response.msg);
              this.app.stopLoaderDark();
            }
          },
          (error:any)=>{
            console.log(error);
            this.app.stopLoaderDark();
          }
        ) 
      }
    });

  }


  ///////////////////////////////////////////////////////////


  inActiveCompanyPromo(row:any){

    
    Swal.fire({
      title:'Alert!',
      text:'Once Confirm Promo will be InActivated Permanently!',
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
        this.http.post(environment.mainApi+'InActiveCompanyPromo',{
          CompanyPromoID:row.companyPromoID,
          UserID: this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Updated Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getCompanyPromo();
              this.app.stopLoaderDark();
            }else{
              this.msg.WarnNotify(Response.msg);
              this.app.stopLoaderDark();
            }
          },
          (error:any)=>{
            console.log(error);
            this.app.stopLoaderDark();
          }
        ) 
      }
    });

  }

/////////////////////////////////////////////////////////////
  
  OpenDialogue(){
    this.dialogue.open(MappingFormComponent,{
      width:"30%",

    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getCompanyPromo();
              }
     
    })
  }

}
