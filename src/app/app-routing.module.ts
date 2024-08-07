import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from './roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ActivityComponent } from "./activity/activity.component";
import {ActivityDetailsComponent} from "./activity-details/activity-details.component";
import {PrizeWheelComponent} from "./prize-wheel/prize-wheel/prize-wheel.component";
import {PrizeWheelGroupComponent} from "@app/prize-wheel/prize-wheel-group/prize-wheel-group.component";
import {PrizeWheelRateComponent} from "@app/prize-wheel/prize-wheel-rate/prize-wheel-rate.component";
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'activities', component: ActivityComponent, data: { permission: 'Pages.Activity' }, canActivate: [AppRouteGuard] },
                    { path: 'activityDetails', component: ActivityDetailsComponent, data: { permission: 'Pages.Activity' }, canActivate: [AppRouteGuard] },
                    { path: 'prizeWheel', component: PrizeWheelComponent, data: { permission: 'Pages.Activity' }, canActivate: [AppRouteGuard] },
                    { path: 'prizeWheelGroup', component: PrizeWheelGroupComponent, data: { permission: 'Pages.Activity' }, canActivate: [AppRouteGuard] },
                    { path: 'prizeWheelRate', component: PrizeWheelRateComponent, data: { permission: 'Pages.Activity' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    { path: 'update-password', component: ChangePasswordComponent }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
