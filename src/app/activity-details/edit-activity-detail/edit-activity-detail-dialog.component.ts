import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {AppComponentBase} from "@shared/app-component-base";
import {ActivityDetailDto, ActivityDetailServiceProxy} from "@shared/service-proxies/service-proxies";
import {MAT_DIALOG_DATA, MatDialogRef} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";
import {IdAndServer} from "@shared/server/server-id";

@Component({
  selector: 'app-edit-activity-detail-dialog',
  templateUrl: './edit-activity-detail-dialog.component.html',
  styleUrls: ['./edit-activity-detail-dialog.component.css']
})
export class EditActivityDetailDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    activity: ActivityDetailDto = new ActivityDetailDto();

    constructor(
        injector: Injector,
        public _activityService: ActivityDetailServiceProxy,
        private _dialogRef: MatDialogRef<EditActivityDetailDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _idAndServer: IdAndServer
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._activityService.get(this._idAndServer.id,this._idAndServer.serverId).subscribe(result => {
            this.activity = result;
        });
    }

    save(): void {
        this.saving = true;

        this._activityService
            .update(this._idAndServer.id,this._idAndServer.serverId,this.activity)
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
