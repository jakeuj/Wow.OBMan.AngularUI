import { Component, Injector, Optional, Inject, OnInit, NgZone, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivityServiceProxy, ActivityDto, ActivityDtoLeftTag, ActivityDtoRightTag, ActivityDtoType}
    from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import {Moment} from "@node_modules/moment";

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity-dialog.component.html',
  styleUrls: ['./edit-activity-dialog.component.css']
})
export class EditActivityDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    activity: ActivityDto = new ActivityDto();
    activityTypes = ActivityDtoType;
    activityLeftTags = ActivityDtoLeftTag;
    activityRightTags = ActivityDtoRightTag;
    dateTimeNow: Moment;

    constructor(
        injector: Injector,
        public _activityService: ActivityServiceProxy,
        private _dialogRef: MatDialogRef<EditActivityDialogComponent>,
        private _ngZone: NgZone,
        @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
    ) {
        super(injector);
    }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    ngOnInit(): void {
        this.dateTimeNow = moment();
        this._activityService.get(this._id).subscribe(result => {
            this.activity = result;
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
