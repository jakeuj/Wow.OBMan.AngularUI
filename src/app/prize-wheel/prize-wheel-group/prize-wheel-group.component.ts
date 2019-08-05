import {Component, Injector} from '@angular/core';
import { PagedResultDtoOfPrizeWheelGroupDto, PrizeWheelGroupDto, PrizeWheelGroupServiceProxy,
} from "@shared/service-proxies/service-proxies";
import {MatDialog} from "@node_modules/@angular/material";
import {finalize} from "@node_modules/rxjs/internal/operators";
import {CreatePrizeWheelGroupDialogComponent} from "./create-prize-wheel-group/create-prize-wheel-group-dialog.component";
import {EditPrizeWheelGroupDialogComponent} from "./edit-prize-wheel-group/edit-prize-wheel-group-dialog.component";
import {PagedAndSortedRequestDto, PagedSortedListingComponentBase} from "@shared/paged-sorted-listing-component-base";
import {IdAndServer} from "@shared/server/server-id";

@Component({
  selector: 'app-prize-wheel-group',
  templateUrl: './prize-wheel-group.component.html',
  styleUrls: ['./prize-wheel-group.component.css']
})
export class PrizeWheelGroupComponent extends PagedSortedListingComponentBase<PrizeWheelGroupDto> {
    prizeWheelGroups: PrizeWheelGroupDto[] = [];
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
        request: PagedAndSortedRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        this._prizeWheelGroupServiceProxy
            .getList(request.sorting,request.skipCount, request.maxResultCount,this.selectedServerId)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfPrizeWheelGroupDto) => {
                this.prizeWheelGroups = result.items;
                this.showPaging(result, pageNumber);
                this.currServerId=this.selectedServerId;
            });
    }

    protected delete(prizeWheelGroup: PrizeWheelGroupDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', prizeWheelGroup.id),
            (result: boolean) => {
                if (result) {
                    this._prizeWheelGroupServiceProxy.delete(prizeWheelGroup.id,this.currServerId).subscribe(() => {
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
            createOrEditPrizeWheelGroupDialog = this._dialog.open(CreatePrizeWheelGroupDialogComponent,{data: this.currServerId});
        } else {
            createOrEditPrizeWheelGroupDialog = this._dialog.open(EditPrizeWheelGroupDialogComponent, {
                data: new IdAndServer(id,this.currServerId)
            });
        }

        createOrEditPrizeWheelGroupDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}
