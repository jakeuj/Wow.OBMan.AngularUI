import {Component, Injector} from '@angular/core';
import {appModuleAnimation} from "@shared/animations/routerTransition";
import {PagedListingComponentBase, PagedRequestDto} from "@shared/paged-listing-component-base";
import {ActivityDetailDto, PagedResultDtoOfActivityDetailDto, ActivityDetailServiceProxy}
    from "@shared/service-proxies/service-proxies";
import {MatDialog} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";
import {EditActivityDetailDialogComponent} from "@app/activity-details/edit-activity-detail/edit-activity-detail-dialog.component";
import {CreateActivityDetailDialogComponent} from "@app/activity-details/create-activity-detail/create-activity-detail-dialog.component";

class GetAllActivityDetailsInput extends PagedRequestDto {
    activityId: number | null | undefined;
    itemType: number | null | undefined;
    itemId: number | null | undefined;
}

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],
    animations: [appModuleAnimation()],
})
export class ActivityDetailsComponent extends PagedListingComponentBase<ActivityDetailDto> {
    activityDetails: ActivityDetailDto[] = [];
    activityId: number | null | undefined;
    itemType: number | null | undefined;
    itemId: number | null | undefined;

    constructor(
        injector: Injector,
        private _activityServiceProxy: ActivityDetailServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    createActivity(): void {
        this.showCreateOrEditActivitDialog();
    }

    editActivity(activity: ActivityDetailDto): void {
        this.showCreateOrEditActivitDialog(activity.id);
    }

    protected list(
        request: GetAllActivityDetailsInput,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.activityId = this.activityId==null?undefined:this.activityId;
        request.itemType = this.itemType==null?undefined:this.itemType;
        request.itemId = this.itemId==null?undefined:this.itemId;

        this._activityServiceProxy
            .getAll(request.activityId,request.itemType,request.itemId, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfActivityDetailDto) => {
                this.activityDetails = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(activity: ActivityDetailDto): void {
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

    private showCreateOrEditActivitDialog(id?: number): void {
        let createOrEditActivitDialog;
        if (id === undefined || id <= 0) {
            createOrEditActivitDialog = this._dialog.open(CreateActivityDetailDialogComponent);
        } else {
            createOrEditActivitDialog = this._dialog.open(EditActivityDetailDialogComponent, {
                data: id
            });
        }

        createOrEditActivitDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}
