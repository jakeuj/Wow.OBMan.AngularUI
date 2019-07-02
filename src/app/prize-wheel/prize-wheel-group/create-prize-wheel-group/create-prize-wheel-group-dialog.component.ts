import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from "@shared/app-component-base";
import {PrizeWheelGroupDto,PrizeWheelGroupServiceProxy} from "@shared/service-proxies/service-proxies";
import {MatDialogRef} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";

@Component({
  selector: 'app-create-prize-wheel-group-dialog',
  templateUrl: './create-prize-wheel-group-dialog.component.html',
  styleUrls: ['./create-prize-wheel-group-dialog.component.css']
})
export class CreatePrizeWheelGroupDialogComponent extends AppComponentBase
    implements OnInit {
    saving: boolean = false;
    prizeWheelGroup: PrizeWheelGroupDto = new PrizeWheelGroupDto();

    constructor(
        injector: Injector,
        public _prizeWheelService: PrizeWheelGroupServiceProxy,
        private _dialogRef: MatDialogRef<CreatePrizeWheelGroupDialogComponent>,
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }

    save(): void {
        this.saving = true;

        this._prizeWheelService
            .create(this.prizeWheelGroup)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close(true);
            });
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}
