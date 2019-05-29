import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import { ActivityServiceProxy,CreateActivityDto} from '@shared/service-proxies/service-proxies';
import {Moment} from "@node_modules/moment";

@Component({
  selector: 'app-create-activity-dialog',
  templateUrl: './create-activity-dialog.component.html',
  styleUrls: ['./create-activity-dialog.component.css']
})
export class CreateActivityDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    activity: CreateActivityDto = new CreateActivityDto();
    public dateTimeRange : Moment[];

    constructor(
        injector: Injector,
        public _activityService: ActivityServiceProxy,
        private _dialogRef: MatDialogRef<CreateActivityDialogComponent>
    ) {
        super(injector);
    }

    ngOnInit(): void {

    }

    save(): void {
        this.saving = true;

        this.activity.startTime=this.dateTimeRange[0];
        this.activity.endTime=this.dateTimeRange[1];

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
