import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { CityComponent } from './city/city.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  constructor(private globalData: GlobalDataModule){}

  ngOnInit(): void {
    this.globalData.setHeaderTitle("Settings");
  }

  @ViewChild(CityComponent) city:any;


}
