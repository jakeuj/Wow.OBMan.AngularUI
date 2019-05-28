import { Component, Injector, Optional, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef,MatCheckboxChange} from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {ActivityServiceProxy,ActivityDto} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity-dialog.component.html',
  styleUrls: ['./edit-activity-dialog.component.css']
})
export class EditActivityDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    activity: ActivityDto = new ActivityDto();
    //roles: RoleDto[] = [];
    checkedRolesMap: { [key: string]: boolean } = {};

    constructor(
        injector: Injector,
        public _activityService: ActivityServiceProxy,
        private _dialogRef: MatDialogRef<EditActivityDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._activityService.get(this._id).subscribe(result => {
            this.activity = result;

            // this._activityService.getRoles().subscribe(result2 => {
            //     this.roles = result2.items;
            //     this.setInitialRolesStatus();
            // });
        });
    }

    // setInitialRolesStatus(): void {
    //     _.map(this.roles, item => {
    //         this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
    //             item.normalizedName
    //         );
    //     });
    // }

    // isRoleChecked(normalizedName: string): boolean {
    //     return _.includes(this.activity.roleNames, normalizedName);
    // }
    //
    // onRoleChange(role: RoleDto, $event: MatCheckboxChange) {
    //     this.checkedRolesMap[role.normalizedName] = $event.checked;
    // }

    // getCheckedRoles(): string[] {
    //     const roles: string[] = [];
    //     _.forEach(this.checkedRolesMap, function(value, key) {
    //         if (value) {
    //             roles.push(key);
    //         }
    //     });
    //     return roles;
    // }

    save(): void {
        this.saving = true;

        //this.activity.roleNames = this.getCheckedRoles();

        this._activityService
            .update(this.activity)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close(true);
            });
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}

