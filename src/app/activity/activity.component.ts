import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { ActivityServiceProxy, ActivityDto, PagedResultDtoOfActivityDto } from '@shared/service-proxies/service-proxies';
import {ResetPasswordDialogComponent} from "@app/users/reset-password/reset-password.component";
import {CreateUserDialogComponent} from "@app/users/create-user/create-user-dialog.component";
import {EditActivityDialogComponent} from "./edit-activity/edit-activity-dialog.component";

class PagedActivityRequestDto extends PagedRequestDto {
    type: number;
}

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ['./activity.component.css']
})
export class ActivityComponent extends PagedListingComponentBase<ActivityDto> {
    activities: ActivityDto[] = [];
    type: number  | null;

    constructor(
        injector: Injector,
        private _activityServiceProxy: ActivityServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    createActivity(): void {
        this.showCreateOrEditUserDialog();
    }

    editActivity(activity: ActivityDto): void {
        this.showCreateOrEditUserDialog(activity.id);
    }

    public resetPassword(activity: ActivityDto): void {
        this.showResetPasswordUserDialog(activity.id);
    }

    protected list(
        request: PagedActivityRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.type = this.type;

        this._activityServiceProxy
            .getAll(request.type, request.skipCount, request.maxResultCount)
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

    private showResetPasswordUserDialog(activityId?: number): void {
        this._dialog.open(ResetPasswordDialogComponent, {
            data: activityId
        });
    }

    private showCreateOrEditUserDialog(id?: number): void {
        let createOrEditUserDialog;
        if (id === undefined || id <= 0) {
            createOrEditUserDialog = this._dialog.open(CreateUserDialogComponent);
        } else {
            createOrEditUserDialog = this._dialog.open(EditActivityDialogComponent, {
                data: id
            });
        }

        createOrEditUserDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}
