import { Component, Injector, Optional, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {ActivityServiceProxy,ActivityDto} from '@shared/service-proxies/service-proxies';
import {Moment} from "@node_modules/moment";

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity-dialog.component.html',
  styleUrls: ['./edit-activity-dialog.component.css']
})
export class EditActivityDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    activity: ActivityDto = new ActivityDto();
    //public dateTimeRange: Moment[] = [];

    constructor(
        injector: Injector,
        public _activityService: ActivityServiceProxy,
        private _dialogRef: MatDialogRef<EditActivityDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._activityService.get(this._id).subscribe(result => {
            this.activity = result;
            //this.dateTimeRange = [this.activity.startTime,this.activity.endTime];
        });
    }

    save(): void {
        this.saving = true;

        this._activityService
            .update(this.activity)
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
