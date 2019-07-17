import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import appConfig from '../../assets/appconfig.json';

@Component({
    templateUrl: './topbar.component.html',
    selector: 'top-bar',
    encapsulation: ViewEncapsulation.None
})
export class TopBarComponent extends AppComponentBase {
    title:string;
    constructor(
        injector: Injector
    ) {
        super(injector);
        this.title=appConfig.title ? appConfig.title:"OBMan";
    }
}
