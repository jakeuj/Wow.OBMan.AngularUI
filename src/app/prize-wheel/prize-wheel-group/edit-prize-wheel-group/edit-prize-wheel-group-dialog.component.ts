import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {AppComponentBase} from "@shared/app-component-base";
import {PrizeWheelGroupDto,PrizeWheelGroupServiceProxy} from "@shared/service-proxies/service-proxies";
import {MAT_DIALOG_DATA, MatDialogRef} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";

@Component({
  selector: 'app-edit-prize-wheel-group-dialog',
  templateUrl: './edit-prize-wheel-group-dialog.component.html',
  styleUrls: ['./edit-prize-wheel-group-dialog.component.css']
})
export class EditPrizeWheelGroupDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    prizeWheelGroup: PrizeWheelGroupDto = new PrizeWheelGroupDto();

    constructor(
        injector: Injector,
        public _prizeWheelService: PrizeWheelGroupServiceProxy,
        private _dialogRef: MatDialogRef<EditPrizeWheelGroupDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._prizeWheelService.get(this._id).subscribe(result => {
            this.prizeWheelGroup = result;
        });
    }

    save(): void {
        this.saving = true;

        this._prizeWheelService
            .update(this.prizeWheelGroup)
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
