import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Navigation/header/header.component';
import { SideNavbarComponent } from './Components/Navigation/side-navbar/side-navbar.component';
import { VoucherformComponent } from './Components/voucherform/voucherform.component';
import { CoaformComponent } from './Components/coaform/coaform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { LedgerComponent } from './Reports/ledger/ledger.component';
import { TrialBalanceComponent } from './Reports/trial-balance/trial-balance.component';
import { PlstatComponent } from './Reports/plstat/plstat.component';
import { BsstatComponent } from './Reports/bsstat/bsstat.component';
import { ToastrModule } from 'ngx-toastr';
import { MainPageComponent } from './Components/main-page/main-page.component';
// import { FilterPipe } from './Shared/pipes/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { PartyComponent } from './Components/party/party.component';
import { Subject } from 'rxjs/internal/Subject';
import { GlobalDataModule } from './Shared/global-data/global-data.module';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SettingsComponent } from './Components/settings/settings.component';
import { CityComponent } from './Components/settings/city/city.component';
import { MaterialModule } from './Shared/material/material.module';
import { AddcityformComponent } from './Components/settings/city/addcityform/addcityform.component';
import { TopNavbarComponent } from './Components/Navigation/top-navbar/top-navbar.component';
import { BankComponent } from './Components/bank/bank.component';


import { OwnerProfileComponent } from './Components/owner-profile/owner-profile.component';


import { OwnersReportComponent } from './Reports/owners-report/owners-report.component';
import { CashbookComponent } from './Reports/cashbook/cashbook.component';

import { CoaNotesComponent } from './Components/settings/coa-notes/coa-notes.component';
import { AddNoteComponent } from './Components/settings/coa-notes/add-note/add-note.component';
import { UpdateCoaComponent } from './Components/coaform/update-coa/update-coa.component';
import { ChangePinComponent } from './Components/add-user/change-pin/change-pin.component';


import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { ListofCustomersComponent } from './Reports/listof-customers/listof-customers.component';
import { BudgettingComponent } from './Components/budgetting/budgetting.component';
import { BudgetReportComponent } from './Reports/budget-report/budget-report.component';
import { DailyTransactionRptComponent } from './Reports/daily-transaction-rpt/daily-transaction-rpt.component';
import { VoucherSupervisionComponent } from './Components/voucher-supervision/voucher-supervision.component';
import { CountryComponent } from './Components/settings/country/country.component';
import { AddCountryComponent } from './Components/settings/country/add-country/add-country.component';
import { FloorComponent } from './Components/settings/floor/floor.component';
import { AddFloorComponent } from './Components/settings/floor/add-floor/add-floor.component';
import { CategoryComponent } from './Components/settings/category/category.component';
import { AddCategoryComponent } from './Components/settings/category/add-category/add-category.component';
import { RoomComponent } from './Components/room/room.component';
import { AddRoomComponent } from './Components/room/add-room/add-room.component';
import { BookingComponent } from './Components/booking/booking.component';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ConfirmBookingComponent } from './Components/booking/confirm-booking/confirm-booking.component';
import { BookingDetailsComponent } from './Components/booking/booking-details/booking-details.component';
import { BookingRptDateWiseComponent } from './Reports/booking-rpt-date-wise/booking-rpt-date-wise.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddCustomerComponent } from './Components/booking/add-customer/add-customer.component';
import { CheckINOUtComponent } from './Components/check-inout/check-inout.component';
import { ServiceComponent } from './Components/settings/service/service.component';
import { AddServiceComponent } from './Components/settings/service/add-service/add-service.component';
import { AddcheckINServiceComponent } from './Components/check-inout/addcheck-inservice/addcheck-inservice.component';
import { CheckOutFormComponent } from './Components/check-inout/check-out-form/check-out-form.component';
import { AddDocumentsComponent } from './Components/check-inout/add-documents/add-documents.component';
import { CioRptDateWiseComponent } from './Reports/cio-rpt-date-wise/cio-rpt-date-wise.component';
import { CioDetailsComponent } from './Components/check-inout/cio-details/cio-details.component';
import { ServicesRptDateWiseComponent } from './Reports/services-rpt-date-wise/services-rpt-date-wise.component';
import { ServicesRptServiceandDatewiseComponent } from './Reports/services-rpt-serviceand-datewise/services-rpt-serviceand-datewise.component';
import { CioRptTypeDatewiseComponent } from './Reports/cio-rpt-type-datewise/cio-rpt-type-datewise.component';
import { CioRptPartywiseComponent } from './Reports/cio-rpt-partywise/cio-rpt-partywise.component';
import { ListOfRoomsComponent } from './Reports/list-of-rooms/list-of-rooms.component';
import { BookingRptPartywiseComponent } from './Reports/booking-rpt-partywise/booking-rpt-partywise.component';
import { PaymentComponent } from './Components/check-inout/payment/payment.component';
import { NotificationService } from './Shared/service/notification.service';
import { HotelDashboardComponent } from './Components/hotel-dashboard/hotel-dashboard.component';
import { CioRptRoomWiseComponent } from './Reports/cio-rpt-room-wise/cio-rpt-room-wise.component';
import { RoomStatusComponent } from './Components/hotel-dashboard/room-status/room-status.component';
import { CustomerCheckInRptComponent } from './Reports/customer-check-in-rpt/customer-check-in-rpt.component';
import { RoomComparisonRptComponent } from './Reports/room-comparison-rpt/room-comparison-rpt.component';
import { CompanyProfileComponent } from './Components/company-profile/company-profile.component';
import { PromoRatesComponent } from './Components/settings/promo-rates/promo-rates.component';
import { AddPromoComponent } from './Components/settings/promo-rates/add-promo/add-promo.component';
import { MapPromoWthCmpnyComponent } from './Components/map-promo-wth-cmpny/map-promo-wth-cmpny.component';
import { MappingFormComponent } from './Components/map-promo-wth-cmpny/mapping-form/mapping-form.component';
import { ListOfPromoComponent } from './Reports/list-of-promo/list-of-promo.component';
import { ListOfCompaniesComponent } from './Reports/list-of-companies/list-of-companies.component';
import { CioRptCompanywiseComponent } from './Reports/cio-rpt-companywise/cio-rpt-companywise.component';
import { CioRptPromowiseComponent } from './Reports/cio-rpt-promowise/cio-rpt-promowise.component';
import { ListOfCompanyPromoComponent } from './Reports/list-of-company-promo/list-of-company-promo.component';


















@NgModule({
  declarations: [   
    AppComponent, 
    HeaderComponent,
    SideNavbarComponent,
    VoucherformComponent,
    CoaformComponent,
    DashBoardComponent,
    LedgerComponent,
    TrialBalanceComponent,
    PlstatComponent,
    BsstatComponent,
    MainPageComponent,
    LoginComponent,
    PartyComponent,
    AddUserComponent,
    SettingsComponent,
    CityComponent,
    AddcityformComponent,
    TopNavbarComponent,
    BankComponent,
    OwnerProfileComponent,
    OwnersReportComponent,
    CashbookComponent,
    CoaNotesComponent,
    AddNoteComponent,
    UpdateCoaComponent,
    ChangePinComponent,
    ListofCustomersComponent,
    BudgettingComponent,
    BudgetReportComponent,
    DailyTransactionRptComponent,
    VoucherSupervisionComponent,
    CountryComponent,
    AddCountryComponent,
    FloorComponent,
    AddFloorComponent,
    CategoryComponent,
    AddCategoryComponent,
    RoomComponent,
    AddRoomComponent,
    BookingComponent,
    ConfirmBookingComponent,
    BookingDetailsComponent,
    BookingRptDateWiseComponent,
    AddCustomerComponent,
    CheckINOUtComponent,
    ServiceComponent,
    AddServiceComponent,
    AddcheckINServiceComponent,
    CheckOutFormComponent,
    AddDocumentsComponent,
    CioRptDateWiseComponent,
    CioDetailsComponent,
    ServicesRptDateWiseComponent,
    ServicesRptServiceandDatewiseComponent,
    CioRptTypeDatewiseComponent,
    CioRptPartywiseComponent,
    ListOfRoomsComponent,
    BookingRptPartywiseComponent,
    PaymentComponent,
    HotelDashboardComponent,
    CioRptRoomWiseComponent,
    RoomStatusComponent,
    CustomerCheckInRptComponent,
    RoomComparisonRptComponent,
    CompanyProfileComponent,
    PromoRatesComponent,
    AddPromoComponent,
    MapPromoWthCmpnyComponent,
    MappingFormComponent,
    ListOfPromoComponent,
    ListOfCompaniesComponent,
    CioRptCompanywiseComponent,
    CioRptPromowiseComponent,
    ListOfCompanyPromoComponent,

 
    
    

    
    // FilterPipe,
    
  ],
  imports: [
    ChartModule,
    
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(), 
    Ng2SearchPipeModule,
    GlobalDataModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    MatProgressBarModule,
    NgxMatSelectSearchModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    NgxPaginationModule
   
    
  

  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }, NotificationService,GlobalDataModule],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
