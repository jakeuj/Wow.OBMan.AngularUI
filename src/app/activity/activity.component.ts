import { Component, Injector } from '@angular/core';
import {MatCheckboxChange, MatDialog} from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import {
    ActivityServiceProxy,
    ActivityDto,
    PagedResultDtoOfActivityDto,
    LeftTag, RightTag, Type, ActivityDtoType, ActivityDtoLeftTag, ActivityDtoRightTag, MappingActivityByActivityIdInput
} from '@shared/service-proxies/service-proxies';
import { EditActivityDialogComponent } from "./edit-activity/edit-activity-dialog.component";
import { CreateActivityDialogComponent } from "@app/activity/create-activity/create-activity-dialog.component";
import * as moment from 'moment';
import * as _ from "lodash";

class GetAllActivitiesInput extends PagedRequestDto {
    goToType: number | null | undefined;
    goTo: number | null | undefined;
    leftTag: LeftTag | null | undefined;
    rightTag: RightTag | null | undefined;
    type: Type | null | undefined;
    startTime: moment.Moment | null | undefined;
    endTime: moment.Moment | null | undefined;
    creationTime: moment.Moment | null | undefined;
}

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ['./activity.component.css']
})
export class ActivityComponent extends PagedListingComponentBase<ActivityDto> {
    activities: ActivityDto[] = [];
    goToType: number | null | undefined;
    goTo: number | null | undefined;
    leftTag: LeftTag | null | undefined;
    rightTag: RightTag | null | undefined;
    type: Type | null | undefined;
    startTime: moment.Moment | null | undefined;
    endTime: moment.Moment | null | undefined;
    creationTime: moment.Moment | null | undefined;
    activityTypes = ActivityDtoType;
    activityLeftTags = ActivityDtoLeftTag;
    activityRightTags = ActivityDtoRightTag;
    dateTimeNow  = moment();
    panelOpenState:boolean=false;
    public saving = false;
    // for mapping
    checkedActivityMap: { [key: number]: boolean } = {};

    constructor(
        injector: Injector,
        private _activityServiceProxy: ActivityServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    createActivity(): void {
        this.showCreateOrEditActivityDialog();
    }

    editActivity(activity: ActivityDto): void {
        this.showCreateOrEditActivityDialog(activity.id);
    }

    protected list(
        request: GetAllActivitiesInput,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.goToType = this.goToType==null?undefined:this.goToType;
        request.goTo = this.goTo==null?undefined:this.goTo;
        request.leftTag = this.leftTag==null?undefined:this.leftTag;
        request.rightTag = this.rightTag==null?undefined:this.rightTag;
        request.type = this.type==null?undefined:this.type;
        request.startTime = this.startTime==null?undefined:this.startTime;
        request.endTime = this.endTime==null?undefined:this.endTime;
        request.creationTime = this.creationTime==null?undefined:this.creationTime;

        this._activityServiceProxy
            .getAll(request.goToType,request.goTo,request.leftTag,request.rightTag,request.type,request.startTime,request.endTime,request.creationTime, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfActivityDto) => {
                this.activities = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(activity: ActivityDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', activity.id),
            (result: boolean) => {
                if (result) {
                    this._activityServiceProxy.delete(activity.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        );
    }
    /*
    mappingAll(): void {
        this.saving = true;
        abp.message.confirm(
            this.l('ActivityMappingWarningMessage'),
            (result: boolean) => {
                if (result) {
                    this._activityServiceProxy
                        .mappingActivity()
                        .pipe(
                            finalize(() => {
                                this.saving = false;
                            })
                        )
                        .subscribe(() => {
                            this.notify.info(this.l('MappedSuccessfully'));
                        });
                } else this.saving=false;
            }
        );
    }
    */
    mapping(): void {
        this.saving = true;
        let activitySelected = this.getCheckedActivity();
        if(activitySelected.length==0) {
            this.notify.info(this.l('NoSelectedActivityWarningMessage'));
            this.saving=false;
            return;
        }
        abp.message.confirm(
            this.l('ActivityMappingWarningMessage') + '\r\n' + activitySelected.toString(),
            (result: boolean) => {
                if (result) {

                    // input
                    let input:MappingActivityByActivityIdInput = new MappingActivityByActivityIdInput();
                    input.activityId=activitySelected;

                    this._activityServiceProxy
                        .mappingActivityByActivityId(input)
                        .pipe(
                            finalize(() => {
                                this.saving = false;
                            })
                        )
                        .subscribe(() => {
                            this.notify.info(this.l('MappedSuccessfully'));
                        });
                } else this.saving=false;
            }
        );
    }

    private showCreateOrEditActivityDialog(id?: number): void {
        let createOrEditActivityDialog;
        if (id === undefined || id <= 0) {
            createOrEditActivityDialog = this._dialog.open(CreateActivityDialogComponent);
        } else {
            createOrEditActivityDialog = this._dialog.open(EditActivityDialogComponent, {
                data: id
            });
        }

        createOrEditActivityDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }

    onActivityChange(activity: ActivityDto, $event: MatCheckboxChange) {
        this.checkedActivityMap[activity.id] = $event.checked;
        //this.notify.info(this.getCheckedActivity().toString());
    }

    getCheckedActivity(): number[] {
        const activity: number[] = [];
        _.forEach(this.checkedActivityMap, function(value, key) {
            if (value) {
                activity.push(+key);
            }
        });
        return activity;
    }
}
