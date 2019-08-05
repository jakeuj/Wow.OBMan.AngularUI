import {Component, Injector} from '@angular/core';
import {PagedResultDtoOfPrizeWheelRateDto,PrizeWheelRateDto,PrizeWheelRateServiceProxy} from "@shared/service-proxies/service-proxies";
import {MatDialog} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";
import {CreatePrizeWheelRateDialogComponent} from "./create-prize-wheel-rate/create-prize-wheel-rate-dialog.component";
import {EditPrizeWheelRateDialogComponent} from "./edit-prize-wheel-rate/edit-prize-wheel-rate-dialog.component";
import {PagedAndSortedRequestDto, PagedSortedListingComponentBase} from "@shared/paged-sorted-listing-component-base";
import {IdAndServer} from "@shared/server/server-id";

@Component({
  selector: 'app-prize-wheel-rate',
  templateUrl: './prize-wheel-rate.component.html',
  styleUrls: ['./prize-wheel-rate.component.css']
})
export class PrizeWheelRateComponent extends PagedSortedListingComponentBase<PrizeWheelRateDto> {
    prizeWheelRates: PrizeWheelRateDto[] = [];
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
        request: PagedAndSortedRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        this._prizeWheelRateServiceProxy
            .getList(request.sorting,request.skipCount, request.maxResultCount,this.selectedServerId)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfPrizeWheelRateDto) => {
                this.prizeWheelRates = result.items;
                this.showPaging(result, pageNumber);
                this.currServerId=this.selectedServerId;
            });
    }

    protected delete(prizeWheelRate: PrizeWheelRateDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', prizeWheelRate.id),
            (result: boolean) => {
                if (result) {
                    this._prizeWheelRateServiceProxy.delete(prizeWheelRate.id,this.currServerId).subscribe(() => {
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
            createOrEditPrizeWheelRateDialog = this._dialog.open(CreatePrizeWheelRateDialogComponent,{data: this.currServerId});
        } else {
            createOrEditPrizeWheelRateDialog = this._dialog.open(EditPrizeWheelRateDialogComponent, {
                data: new IdAndServer(id,this.currServerId)
            });
        }

        createOrEditPrizeWheelRateDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}
