import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {AppComponentBase} from "@shared/app-component-base";
import {PrizeWheelDto,PrizeWheelServiceProxy} from "@shared/service-proxies/service-proxies";
import {MAT_DIALOG_DATA, MatDialogRef} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";
import {IdAndServer} from "@shared/server/server-id";

@Component({
  selector: 'app-edit-prize-wheel-dialog-component',
  templateUrl: './edit-prize-wheel-dialog.component.html',
  styleUrls: ['./edit-prize-wheel-dialog.component.css']
})
export class EditPrizeWheelDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    prizeWheel: PrizeWheelDto = new PrizeWheelDto();

    constructor(
        injector: Injector,
        public _prizeWheelService: PrizeWheelServiceProxy,
        private _dialogRef: MatDialogRef<EditPrizeWheelDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _idAndServer: IdAndServer
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._prizeWheelService.get(this._idAndServer.id,this._idAndServer.serverId).subscribe(result => {
            this.prizeWheel = result;
        });
    }

    save(): void {
        this.saving = true;

        this._prizeWheelService
            .update(this._idAndServer.id, this._idAndServer.serverId,this.prizeWheel)
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
