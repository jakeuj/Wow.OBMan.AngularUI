import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// Angular Date Time Picker
import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
// Activities
import { ActivityComponent } from './activity/activity.component';
import { EditActivityDialogComponent } from './activity/edit-activity/edit-activity-dialog.component';
import { CreateActivityDialogComponent } from './activity/create-activity/create-activity-dialog.component';
import { ActivityEnumsPipe } from './activity/activity-enums.pipe';
// Activities Detail
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { CreateActivityDetailDialogComponent } from './activity-details/create-activity-detail/create-activity-detail-dialog.component';
import { EditActivityDetailDialogComponent } from './activity-details/edit-activity-detail/edit-activity-detail-dialog.component';
import { GetActivityTitlePipe } from './activity/get-activity-title.pipe';
import { PrizeWheelComponent } from './prize-wheel/prize-wheel/prize-wheel.component';
import { CreatePrizeWheelDialogComponent } from './prize-wheel/prize-wheel/create-prize-wheel/create-prize-wheel-dialog.component';
import { EditPrizeWheelDialogComponent } from './prize-wheel/prize-wheel/edit-prize-wheel/edit-prize-wheel-dialog.component';
import { PrizeWheelGroupComponent } from './prize-wheel/prize-wheel-group/prize-wheel-group.component';
import { CreatePrizeWheelGroupDialogComponent } from './prize-wheel/prize-wheel-group/create-prize-wheel-group/create-prize-wheel-group-dialog.component';
import { EditPrizeWheelGroupDialogComponent } from './prize-wheel/prize-wheel-group/edit-prize-wheel-group/edit-prize-wheel-group-dialog.component';
import { PrizeWheelRateComponent } from './prize-wheel/prize-wheel-rate/prize-wheel-rate.component';
import { CreatePrizeWheelRateDialogComponent } from './prize-wheel/prize-wheel-rate/create-prize-wheel-rate/create-prize-wheel-rate-dialog.component';
import { EditPrizeWheelRateDialogComponent } from './prize-wheel/prize-wheel-rate/edit-prize-wheel-rate/edit-prize-wheel-rate-dialog.component';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_MOMENT_FORMATS = {
    parseInput: 'l LT',
    fullPickerInput: 'l LT',
    datePickerInput: 'l',
    timePickerInput: 'LT',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TopBarComponent,
    TopBarLanguageSwitchComponent,
    SideBarUserAreaComponent,
    SideBarNavComponent,
    SideBarFooterComponent,
    RightSideBarComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
      // Activities
    ActivityComponent,
    EditActivityDialogComponent,
    ActivityEnumsPipe,
    CreateActivityDialogComponent,
    ActivityDetailsComponent,
    CreateActivityDetailDialogComponent,
    EditActivityDetailDialogComponent,
    GetActivityTitlePipe,
    PrizeWheelComponent,
    CreatePrizeWheelDialogComponent,
    EditPrizeWheelDialogComponent,
    PrizeWheelGroupComponent,
    CreatePrizeWheelGroupDialogComponent,
    EditPrizeWheelGroupDialogComponent,
    PrizeWheelRateComponent,
    CreatePrizeWheelRateDialogComponent,
    EditPrizeWheelRateDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JsonpModule,
    ModalModule.forRoot(),
    AbpModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
      //OwlDateTime
      OwlDateTimeModule,
      //OwlNativeDateTimeModule,
      OwlMomentDateTimeModule
  ],
  providers: [
      {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
  ],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    //activity
    EditActivityDialogComponent,
      CreateActivityDialogComponent,
      // activity detail
      CreateActivityDetailDialogComponent,
      EditActivityDetailDialogComponent,
      // PrizeWheel
      CreatePrizeWheelDialogComponent,
      EditPrizeWheelDialogComponent,
      //PrizeWheelGroup
      CreatePrizeWheelGroupDialogComponent,
      EditPrizeWheelGroupDialogComponent,
      //PrizeWheelRate
      CreatePrizeWheelRateDialogComponent,
      EditPrizeWheelRateDialogComponent


  ]
})
export class AppModule {}
