import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {AppComponentBase} from "@shared/app-component-base";
import {PrizeWheelRateDto, PrizeWheelRateServiceProxy} from "@shared/service-proxies/service-proxies";
import {MAT_DIALOG_DATA, MatDialogRef} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";

@Component({
  selector: 'app-edit-prize-wheel-rate-dialog',
  templateUrl: './edit-prize-wheel-rate-dialog.component.html',
  styleUrls: ['./edit-prize-wheel-rate-dialog.component.css']
})
export class EditPrizeWheelRateDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    prizeWheelRate: PrizeWheelRateDto = new PrizeWheelRateDto();

    constructor(
        injector: Injector,
        public _prizeWheelService: PrizeWheelRateServiceProxy,
        private _dialogRef: MatDialogRef<EditPrizeWheelRateDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._prizeWheelService.get(this._id).subscribe(result => {
            this.prizeWheelRate = result;
        });
    }

    save(): void {
        this.saving = true;

        this._prizeWheelService
            .update(this.prizeWheelRate)
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
