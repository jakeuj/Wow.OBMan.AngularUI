import { Component, Injector } from '@angular/core';
import {MatSlideToggleChange, MatDialog} from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    ActivityServiceProxy,
    ActivityDto,
    PagedResultDtoOfActivityDto,
    LeftTag,
    RightTag,
    Type,
    ActivityDtoType,
    ActivityDtoLeftTag,
    ActivityDtoRightTag,
    RedisServiceProxy,
    MappingActivityInput
} from '@shared/service-proxies/service-proxies';
import {EditActivityDialogComponent} from "./edit-activity/edit-activity-dialog.component";
import moment from 'moment';
import * as _ from "lodash";
import {
    PagedAndSortedRequestDto,
    PagedSortedListingComponentBase
} from "@shared/paged-sorted-listing-component-base";
import {IdAndServer} from "@shared/server/server-id";
import {CreateActivityDialogComponent} from "./create-activity/create-activity-dialog.component";

class GetAllActivitiesInput extends PagedAndSortedRequestDto {
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
export class ActivityComponent extends PagedSortedListingComponentBase<ActivityDto> {
    public activities: ActivityDto[] = [];
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
    //server
    targetServerIds:number[];

    constructor(
        injector: Injector,
        private _activityServiceProxy: ActivityServiceProxy,
        private _redisServiceProxy: RedisServiceProxy,
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
        request.sorting="ActivityId DESC, Threshold ASC";

        this._activityServiceProxy
            .getList(request.goToType,request.goTo,request.leftTag,request.rightTag,request.type,request.startTime,request.endTime,request.creationTime,this.selectedServerId, request.sorting, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfActivityDto) => {
                this.activities = result.items;
                this.showPaging(result, pageNumber);
                this.currServerId=this.selectedServerId;
            });
    }

    protected delete(activity: ActivityDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', activity.id),
            (result: boolean) => {
                if (result) {
                    this._activityServiceProxy.delete(activity.id,this.currServerId).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        );
    }

    public mapping(): void {
        this.saving = true;
        let activitySelected = this.getCheckedActivity();
        if(activitySelected.length==0) {
            this.notify.info(this.l('NoSelectedActivityWarningMessage'));
            this.saving=false;
            return;
        }
        if(this.targetServerIds.find(x=>x==this.currServerId)) {
            this.notify.info(this.l('TargetContainOriginServerId'));
            this.saving=false;
            return;
        }
        abp.message.confirm(
            this.l('ActivityMappingWarningMessage') + '\r\nFrom S' +this.currServerId + ' to ' + this.targetServerIds.toString() + '\r\nId:' + activitySelected.toString(),
            (result: boolean) => {
                if (result) {

                    // input
                    let input:MappingActivityInput = new MappingActivityInput();
                    input.activityIds=activitySelected;
                    input.serverId=this.currServerId;
                    input.targetServerIds=this.targetServerIds;

                    this._activityServiceProxy
                        .mapping(input)
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
            createOrEditActivityDialog = this._dialog.open(CreateActivityDialogComponent, {
                data: this.currServerId});
        } else {
            createOrEditActivityDialog = this._dialog.open(EditActivityDialogComponent, {
                data: new IdAndServer(id,this.currServerId)
            });
        }

        createOrEditActivityDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }

    onActivityChange(activity: ActivityDto, $event: MatSlideToggleChange) {
        this.checkedActivityMap[activity.id] = $event.checked;
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

    addCache(): void {
        this.saving = true;
        abp.message.confirm(
            this.l('AddCacheWarningMessage'),
            (result: boolean) => {
                if (result) {
                    this._redisServiceProxy
                        .addCache(this.currServerId)
                        .pipe(
                            finalize(() => {
                                this.saving = false;
                            })
                        )
                        .subscribe(() => {
                            this.notify.info(this.l('AddCacheSuccessfully'));
                        });
                } else this.saving = false;
            });
    }
}
