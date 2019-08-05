import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {AppComponentBase} from "@shared/app-component-base";
import {PrizeWheelRateDto, PrizeWheelRateServiceProxy} from "@shared/service-proxies/service-proxies";
import {MAT_DIALOG_DATA, MatDialogRef} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";

@Component({
  selector: 'app-create-prize-wheel-rate-dialog',
  templateUrl: './create-prize-wheel-rate-dialog.component.html',
  styleUrls: ['./create-prize-wheel-rate-dialog.component.css']
})
export class CreatePrizeWheelRateDialogComponent extends AppComponentBase
    implements OnInit {
    saving: boolean = false;
    prizeWheelRate: PrizeWheelRateDto = new PrizeWheelRateDto();

    constructor(
        injector: Injector,
        public _prizeWheelService: PrizeWheelRateServiceProxy,
        private _dialogRef: MatDialogRef<CreatePrizeWheelRateDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _serverId: number
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }

    save(): void {
        this.saving = true;

        this._prizeWheelService
            .create(this._serverId,this.prizeWheelRate)
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
