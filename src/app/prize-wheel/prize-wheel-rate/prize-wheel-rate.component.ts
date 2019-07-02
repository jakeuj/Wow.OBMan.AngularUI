import {Component, Injector, OnInit} from '@angular/core';
import {PagedListingComponentBase, PagedRequestDto} from "@shared/paged-listing-component-base";
import {PagedResultDtoOfPrizeWheelRateDto,PrizeWheelRateDto,PrizeWheelRateServiceProxy} from "@shared/service-proxies/service-proxies";
import * as moment from "@node_modules/moment";
import {MatDialog} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";
import {CreatePrizeWheelRateDialogComponent} from "./create-prize-wheel-rate/create-prize-wheel-rate-dialog.component";
import {EditPrizeWheelRateDialogComponent} from "./edit-prize-wheel-rate/edit-prize-wheel-rate-dialog.component";

@Component({
  selector: 'app-prize-wheel-rate',
  templateUrl: './prize-wheel-rate.component.html',
  styleUrls: ['./prize-wheel-rate.component.css']
})
export class PrizeWheelRateComponent extends PagedListingComponentBase<PrizeWheelRateDto> {
    prizeWheelRates: PrizeWheelRateDto[] = [];
    creationTime: moment.Moment | null | undefined;
    public saving = false;

    constructor(
        injector: Injector,
        private _prizeWheelRateServiceProxy: PrizeWheelRateServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    createPrizeWheelRate(): void {
        this.showCreateOrEditPrizeWheelRateDialog();
    }

    editPrizeWheelRate(prizeWheel: PrizeWheelRateDto): void {
        this.showCreateOrEditPrizeWheelRateDialog(prizeWheel.id);
    }

    protected list(
        request: PagedRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        this._prizeWheelRateServiceProxy
            .getAll(null,request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfPrizeWheelRateDto) => {
                this.prizeWheelRates = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(prizeWheelRate: PrizeWheelRateDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', prizeWheelRate.id),
            (result: boolean) => {
                if (result) {
                    this._prizeWheelRateServiceProxy.delete(prizeWheelRate.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        );
    }

    private showCreateOrEditPrizeWheelRateDialog(id?: number): void {
        let createOrEditPrizeWheelRateDialog;
        if (id === undefined || id <= 0) {
            createOrEditPrizeWheelRateDialog = this._dialog.open(CreatePrizeWheelRateDialogComponent);
        } else {
            createOrEditPrizeWheelRateDialog = this._dialog.open(EditPrizeWheelRateDialogComponent, {
                data: id
            });
        }

        createOrEditPrizeWheelRateDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}
