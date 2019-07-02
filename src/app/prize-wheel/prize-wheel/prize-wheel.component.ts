import { Component, Injector } from '@angular/core';
import {MatSlideToggleChange, MatDialog} from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import {
    PrizeWheelServiceProxy,
    PrizeWheelDto,
    PagedResultDtoOfPrizeWheelDto
} from '@shared/service-proxies/service-proxies';
import { EditActivityDialogComponent } from "@app/activity/edit-activity/edit-activity-dialog.component";
import { CreateActivityDialogComponent } from "@app/activity/create-activity/create-activity-dialog.component";
import * as moment from 'moment';
import * as _ from "lodash";
import {CreatePrizeWheelDialogComponent} from "@app/prize-wheel/prize-wheel/create-prize-wheel/create-prize-wheel-dialog.component";
import {EditPrizeWheelDialogComponent} from "@app/prize-wheel/prize-wheel/edit-prize-wheel/edit-prize-wheel-dialog.component";

class GetAllPrizeWheelsInput extends PagedRequestDto {
    prizeWheelGroupId: number | null | undefined;
    usedItemType: number | null | undefined;
    usedItemId: number | null | undefined;
    usedItemCount: number | null | undefined;
    spinCount: number | null | undefined;
    purchaseId: number | null | undefined;
    creationTime: moment.Moment | null | undefined;
}

@Component({
  selector: 'app-prize-wheel',
  templateUrl: './prize-wheel.component.html',
  styleUrls: ['./prize-wheel.component.css']
})
export class PrizeWheelComponent extends PagedListingComponentBase<PrizeWheelDto> {
    prizeWheels: PrizeWheelDto[] = [];
    creationTime: moment.Moment | null | undefined;
    public saving = false;

    constructor(
        injector: Injector,
        private _prizeWheelServiceProxy: PrizeWheelServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    createPrizeWheel(): void {
        this.showCreateOrEditActivityDialog();
    }

    editPrizeWheel(prizeWheel: PrizeWheelDto): void {
        this.showCreateOrEditActivityDialog(prizeWheel.id);
    }

    protected list(
        request: GetAllPrizeWheelsInput,
        pageNumber: number,
        finishedCallback: Function
    ): void {
        request.creationTime = this.creationTime==null?undefined:this.creationTime;

        this._prizeWheelServiceProxy
            .getAll(request.prizeWheelGroupId,request.usedItemType,request.usedItemId,request.usedItemCount,request.spinCount,request.purchaseId,request.creationTime, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfPrizeWheelDto) => {
                this.prizeWheels = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(prizeWheel: PrizeWheelDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', prizeWheel.id),
            (result: boolean) => {
                if (result) {
                    this._prizeWheelServiceProxy.delete(prizeWheel.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        );
    }

    private showCreateOrEditActivityDialog(id?: number): void {
        let createOrEditPrizeWheelDialog;
        if (id === undefined || id <= 0) {
            createOrEditPrizeWheelDialog = this._dialog.open(CreatePrizeWheelDialogComponent);
        } else {
            createOrEditPrizeWheelDialog = this._dialog.open(EditPrizeWheelDialogComponent, {
                data: id
            });
        }

        createOrEditPrizeWheelDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}
