import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from "@shared/app-component-base";
import {ActivityDetailDto, ActivityDetailServiceProxy} from "@shared/service-proxies/service-proxies";
import {MatDialogRef} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";

@Component({
  selector: 'app-create-activity-detail-dialog',
  templateUrl: './create-activity-detail-dialog.component.html',
  styleUrls: ['./create-activity-detail-dialog.component.css']
})
export class CreateActivityDetailDialogComponent extends AppComponentBase
    implements OnInit {
    saving: boolean = false;
    activity: ActivityDetailDto = new ActivityDetailDto();

    constructor(
        injector: Injector,
        public _activityService: ActivityDetailServiceProxy,
        private _dialogRef: MatDialogRef<CreateActivityDetailDialogComponent>,
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }

    save(): void {
        this.saving = true;

        this._activityService
            .create(this.activity)
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
