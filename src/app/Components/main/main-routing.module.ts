import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { MainModule } from './main.module';
import { CoaformComponent } from '../coaform/coaform.component';
import { DashBoardComponent } from '../dash-board/dash-board.component';
import { VoucherformComponent } from '../voucherform/voucherform.component';
import { LedgerComponent } from 'src/app/Reports/ledger/ledger.component';
import { TrialBalanceComponent } from 'src/app/Reports/trial-balance/trial-balance.component';
import { PlstatComponent } from 'src/app/Reports/plstat/plstat.component';
import { BsstatComponent } from 'src/app/Reports/bsstat/bsstat.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { PartyComponent } from '../party/party.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { SettingsComponent } from '../settings/settings.component';
import { BankComponent } from '../bank/bank.component';
import { OwnerProfileComponent } from '../owner-profile/owner-profile.component';
import { OwnersReportComponent } from 'src/app/Reports/owners-report/owners-report.component';
import { CashbookComponent } from 'src/app/Reports/cashbook/cashbook.component';
import { ListofCustomersComponent } from 'src/app/Reports/listof-customers/listof-customers.component';
import { BudgettingComponent } from '../budgetting/budgetting.component';
import { BudgetReportComponent } from 'src/app/Reports/budget-report/budget-report.component';
import { DailyTransactionRptComponent } from 'src/app/Reports/daily-transaction-rpt/daily-transaction-rpt.component';
import { VoucherSupervisionComponent } from '../voucher-supervision/voucher-supervision.component';
import { RoomComponent } from '../room/room.component';
import { BookingComponent } from '../booking/booking.component';
import { BookingRptDateWiseComponent } from 'src/app/Reports/booking-rpt-date-wise/booking-rpt-date-wise.component';
import { CheckINOUtComponent } from '../check-inout/check-inout.component';
import { CioRptDateWiseComponent } from 'src/app/Reports/cio-rpt-date-wise/cio-rpt-date-wise.component';
import { ServicesRptDateWiseComponent } from 'src/app/Reports/services-rpt-date-wise/services-rpt-date-wise.component';
import { ServicesRptServiceandDatewiseComponent } from 'src/app/Reports/services-rpt-serviceand-datewise/services-rpt-serviceand-datewise.component';
import { CioRptTypeDatewiseComponent } from 'src/app/Reports/cio-rpt-type-datewise/cio-rpt-type-datewise.component';
import { CioRptPartywiseComponent } from 'src/app/Reports/cio-rpt-partywise/cio-rpt-partywise.component';
import { ListOfRoomsComponent } from 'src/app/Reports/list-of-rooms/list-of-rooms.component';
import { BookingRptPartywiseComponent } from 'src/app/Reports/booking-rpt-partywise/booking-rpt-partywise.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/app/auth.guard';
import { HotelDashboardComponent } from '../hotel-dashboard/hotel-dashboard.component';
import { CioRptRoomWiseComponent } from 'src/app/Reports/cio-rpt-room-wise/cio-rpt-room-wise.component';
import { RoomComparisonRptComponent } from 'src/app/Reports/room-comparison-rpt/room-comparison-rpt.component';
import { CustomerCheckInRptComponent } from 'src/app/Reports/customer-check-in-rpt/customer-check-in-rpt.component';
import { CompanyProfileComponent } from '../company-profile/company-profile.component';
import { MapPromoWthCmpnyComponent } from '../map-promo-wth-cmpny/map-promo-wth-cmpny.component';
import { ListOfPromoComponent } from 'src/app/Reports/list-of-promo/list-of-promo.component';
import { ListOfCompanyPromoComponent } from 'src/app/Reports/list-of-company-promo/list-of-company-promo.component';
import { ListOfCompaniesComponent } from 'src/app/Reports/list-of-companies/list-of-companies.component';
import { CioRptCompanywiseComponent } from 'src/app/Reports/cio-rpt-companywise/cio-rpt-companywise.component';
import { CioRptPromowiseComponent } from 'src/app/Reports/cio-rpt-promowise/cio-rpt-promowise.component';



const routes: Routes = [
  {path:'',component:MainPageComponent, children:[
    {path:'dashBoard', component:DashBoardComponent, canActivate : [AuthGuard] },
    
  { path: 'coa', component: CoaformComponent,canActivate : [AuthGuard]  },
  {path:'voucher', component: VoucherformComponent,canActivate : [AuthGuard]},
  {path:'ldgrpt', component: LedgerComponent,canActivate : [AuthGuard]},
  {path:'tbrpt', component: TrialBalanceComponent,canActivate : [AuthGuard]},
  {path:'plrpt', component: PlstatComponent,canActivate : [AuthGuard]},
  {path:'bsrpt', component: BsstatComponent,canActivate : [AuthGuard]},
  {path:'party', component: PartyComponent,canActivate : [AuthGuard]},
  {path:'AddUser', component: AddUserComponent,canActivate : [AuthGuard]},
  {path:'Settings',component:SettingsComponent,canActivate : [AuthGuard]},
  // {path:'bank',component:BankComponent,canActivate : [AuthGuard]},
  {path:'OwnerProfile',component:OwnerProfileComponent,canActivate : [AuthGuard]},

  // {path:'orptl',component:OwnersReportComponent,canActivate : [AuthGuard]},
  {path:'CBRpt',component:CashbookComponent,canActivate : [AuthGuard]},
  {path:'rptcust',component:ListofCustomersComponent,canActivate : [AuthGuard]},
  {path:'bdgtng',component:BudgettingComponent,canActivate : [AuthGuard]},
  {path:'bdgtrpt',component:BudgetReportComponent,canActivate : [AuthGuard]},
  {path:'Dtranrpt',component:DailyTransactionRptComponent,canActivate : [AuthGuard]},
  {path:'spv',component:VoucherSupervisionComponent,canActivate : [AuthGuard]},
  {path:'addRoom',component:RoomComponent,canActivate : [AuthGuard]},
  {path:'bkng',component:BookingComponent,canActivate : [AuthGuard]},
  {path:'brptdw',component:BookingRptDateWiseComponent,canActivate : [AuthGuard]},
  {path:'chkio',component:CheckINOUtComponent,canActivate : [AuthGuard]},
  {path:'ciorptdw',component:CioRptDateWiseComponent,canActivate : [AuthGuard]},
  {path:'ciorpttdw',component:CioRptTypeDatewiseComponent,canActivate : [AuthGuard]},
  {path:'ciorptpw',component:CioRptPartywiseComponent,canActivate : [AuthGuard]},
 
  {path:'srptdw',component:ServicesRptDateWiseComponent,canActivate : [AuthGuard]},
  {path:'srptsdw',component:ServicesRptServiceandDatewiseComponent,canActivate : [AuthGuard]},
  {path:'rptlor',component:ListOfRoomsComponent,canActivate : [AuthGuard]},
  {path:'brptpw',component:BookingRptPartywiseComponent,canActivate : [AuthGuard]},
  {path:'ciorptrw',component:CioRptRoomWiseComponent,canActivate:[AuthGuard]},
  {path:'htldb', component:HotelDashboardComponent,canActivate:[AuthGuard]},
  {path:'rcrpt', component:RoomComparisonRptComponent,canActivate:[AuthGuard]},
  {path:'ccdrpt', component:CustomerCheckInRptComponent,canActivate:[AuthGuard]},
  {path:'cmpprof', component:CompanyProfileComponent,canActivate:[AuthGuard]},
  {path:'mpwc', component:MapPromoWthCmpnyComponent,canActivate:[AuthGuard]},
  {path:'locom', component:ListOfCompaniesComponent,canActivate:[AuthGuard]},
  {path:'lop', component:ListOfPromoComponent,canActivate:[AuthGuard]},
  {path:'locp', component:ListOfCompanyPromoComponent,canActivate:[AuthGuard]},
  {path:'ciorptcomw', component:CioRptCompanywiseComponent,canActivate:[AuthGuard]},
  {path:'ciorptpmw', component:CioRptPromowiseComponent,canActivate:[AuthGuard]},
  
  {path:'', redirectTo:'/main/dashBoard',pathMatch:'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { 
  constructor(private globalData:GlobalDataModule){}


  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
  //   return this.globalData.canActivate(route.params['id']);
  // }
}


