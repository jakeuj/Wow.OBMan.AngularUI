import {Component, Injector, OnInit, NgZone, ViewChild, Optional, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivityServiceProxy, CreateActivityDto, ActivityDtoType, ActivityDtoLeftTag, ActivityDtoRightTag}
from '@shared/service-proxies/service-proxies';
import moment, { Moment } from 'moment';
@Component({
  selector: 'app-create-activity-dialog',
  templateUrl: './create-activity-dialog.component.html',
  styleUrls: ['./create-activity-dialog.component.css']
})
export class CreateActivityDialogComponent extends AppComponentBase
    implements OnInit {
    saving: boolean = false;
    activity: CreateActivityDto = new CreateActivityDto();
    dateTimeNow: Moment;
    dateTimeRange: Moment[];
    activityTypes = ActivityDtoType;
    activityLeftTags = ActivityDtoLeftTag;
    activityRightTags = ActivityDtoRightTag;
    activityTitle: string;
    activityMessage: string;

    constructor(
        injector: Injector,
        public _activityService: ActivityServiceProxy,
        private _dialogRef: MatDialogRef<CreateActivityDialogComponent>,
        private _ngZone: NgZone,
        @Optional() @Inject(MAT_DIALOG_DATA) private _serverId: number
    ) {
        super(injector);
    }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    ngOnInit(): void {
        this.dateTimeNow=moment();
        this.dateTimeRange=[this.dateTimeNow,this.dateTimeNow];

        this.activity.goToType=0;
        this.activity.goTo=0;

        this.activity.leftTag = 0;
        this.activity.rightTag = 0;
    }

    save(): void {
        this.saving = true;

        this.activity.startTime=this.dateTimeRange[0];
        this.activity.endTime=this.dateTimeRange[1];

        this.activity.message="<t>".concat(this.activityTitle,",<p>",this.activityMessage);

        this._activityService
            .create(this._serverId,this.activity)
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
