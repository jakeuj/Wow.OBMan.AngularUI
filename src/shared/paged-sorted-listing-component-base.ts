import { AppComponentBase } from 'shared/app-component-base';
import { Injector, OnInit } from '@angular/core';

export class PagedResultDto {
    items: any[];
    totalCount: number;
}

export class EntityDto {
    id: number;
}

export class PagedAndSortedRequestDto {
    skipCount: number;
    maxResultCount: number;
    sorting: string;
}

export abstract class PagedSortedListingComponentBase<TEntityDto> extends AppComponentBase implements OnInit {

    public pageSize = 10;
    public pageNumber = 1;
    public totalPages = 1;
    public totalItems: number;
    public isTableLoading = false;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh(): void {
        this.getDataPage(this.pageNumber);
    }

    public showPaging(result: PagedResultDto, pageNumber: number): void {
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;

        this.totalItems = result.totalCount;
        this.pageNumber = pageNumber;
    }

    public getDataPage(page: number): void {
        const req = new PagedAndSortedRequestDto();
        req.maxResultCount = this.pageSize;
        req.skipCount = (page - 1) * this.pageSize;

        this.isTableLoading = true;
        this.list(req, page, () => {
            this.isTableLoading = false;
        });
    }

    protected abstract list(request: PagedAndSortedRequestDto, pageNumber: number, finishedCallback: Function): void;
    protected abstract delete(entity: TEntityDto): void;
}