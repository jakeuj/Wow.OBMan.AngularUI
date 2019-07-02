import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l('HomePage'), '', 'home', '/app/home'),
        new MenuItem(this.l('Tenants'), 'Pages.Tenants', 'business', '/app/tenants'),
        new MenuItem(this.l('Users'), 'Pages.Users', 'people', '/app/users'),
        new MenuItem(this.l('Roles'), 'Pages.Roles', 'local_offer', '/app/roles'),
        new MenuItem(this.l('Activity'), 'Pages.Activity', 'info', '', [
            new MenuItem(this.l('ActivityConfig'), 'Pages.Activity', '', '/app/activities'),
            new MenuItem(this.l('ActivityDetails'), 'Pages.Activity', '', '/app/activityDetails' ),
            new MenuItem(this.l('PrizeWheel'), 'Pages.Activity', '', '', [
            new MenuItem(this.l('PrizeWheel'), 'Pages.Activity', '', '/app/prizeWheel' ),
            new MenuItem(this.l('PrizeWheelGroup'), 'Pages.Activity', '', '/app/prizeWheelGroup' ),
            new MenuItem(this.l('PrizeWheelRate'), 'Pages.Activity', '', '/app/prizeWheelRate' )])
        ]),
        new MenuItem(this.l('About'), '', 'menu', '', [
            new MenuItem(this.l('ProductionAdmin'), '', '', 'http://admin.nlzm.huayang.fun/' ),
            new MenuItem(this.l('TestAdmin'), '', '', 'http://admin.nlzm.huayang.fun:9999/' ),
            new MenuItem(this.l('WowGame'), '', '', 'http://www.wowgame.com.tw/' ),
            new MenuItem(this.l('ASP.NET Boilerplate'), '', '', '/app/about'),

        ]),
    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}
