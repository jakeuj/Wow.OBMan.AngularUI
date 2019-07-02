import {Component, Injector, OnInit} from '@angular/core';
import {PagedListingComponentBase, PagedRequestDto} from "@shared/paged-listing-component-base";
import { PagedResultDtoOfPrizeWheelGroupDto, PrizeWheelGroupDto, PrizeWheelGroupServiceProxy,
} from "@shared/service-proxies/service-proxies";
import * as moment from "@node_modules/moment";
import {MatDialog} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";
import {CreatePrizeWheelGroupDialogComponent} from "./create-prize-wheel-group/create-prize-wheel-group-dialog.component";
import {EditPrizeWheelGroupDialogComponent} from "./edit-prize-wheel-group/edit-prize-wheel-group-dialog.component";

@Component({
  selector: 'app-prize-wheel-group',
  templateUrl: './prize-wheel-group.component.html',
  styleUrls: ['./prize-wheel-group.component.css']
})
export class PrizeWheelGroupComponent extends PagedListingComponentBase<PrizeWheelGroupDto> {
    prizeWheelGroups: PrizeWheelGroupDto[] = [];
    creationTime: moment.Moment | null | undefined;
    public saving = false;

    constructor(
        injector: Injector,
        private _prizeWheelGroupServiceProxy: PrizeWheelGroupServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    createPrizeWheelGroup(): void {
        this.showCreateOrEditActivityDialog();
    }

    editPrizeWheelGroup(prizeWheel: PrizeWheelGroupDto): void {
        this.showCreateOrEditActivityDialog(prizeWheel.id);
    }

    protected list(
        request: PagedRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        this._prizeWheelGroupServiceProxy
            .getAll(null,request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfPrizeWheelGroupDto) => {
                this.prizeWheelGroups = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(prizeWheelGroup: PrizeWheelGroupDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', prizeWheelGroup.id),
            (result: boolean) => {
                if (result) {
                    this._prizeWheelGroupServiceProxy.delete(prizeWheelGroup.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        );
    }

    private showCreateOrEditActivityDialog(id?: number): void {
        let createOrEditPrizeWheelGroupDialog;
        if (id === undefined || id <= 0) {
            createOrEditPrizeWheelGroupDialog = this._dialog.open(CreatePrizeWheelGroupDialogComponent);
        } else {
            createOrEditPrizeWheelGroupDialog = this._dialog.open(EditPrizeWheelGroupDialogComponent, {
                data: id
            });
        }

        createOrEditPrizeWheelGroupDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}
