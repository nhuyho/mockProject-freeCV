import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {
    REGEX_CHECK_SPACE_STRING,
    REGEX_ISVALID_EMAIL,
    REGEX_ISVALID_PHONE,
    REGEX_ONLY_STRING,
} from 'src/app/app.constants';

import { UserService } from 'src/app/services/user.service';
import { Options, User } from 'src/app/shared/models/user-list.model';

@Component({
    selector: 'app-admin-user-list',
    templateUrl: './admin-user-list.component.html',
    styleUrls: ['./admin-user-list.component.scss'],
})
export class AdminUserListComponent implements OnInit {
    listUserData: User[] = [];
    clonedUsers: { [id: string]: User } = {};
    statuses!: Options[];
    genderes!: Options[];
    loading: boolean = true;
    ref!: DynamicDialogRef;
    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getUserList().subscribe((res) => {
            this.listUserData = res.map((user) => {
                return {
                    id: user.payload.doc.id,
                    ...(user.payload.doc.data() as {}),
                    dayOfBirth: new Date(
                        user.payload.doc.get('dayOfBirth') || 1604395966369
                    ),
                } as User;
            });

            this.loading = false;
        });

        this.statuses = [
            {
                label: 'None',
                value: 'None',
            },
            {
                label: 'Pending',
                value: 'Pending',
            },
            {
                label: 'Pass',
                value: 'Pass',
            },
            {
                label: 'Failed',
                value: 'Failed',
            },
        ];

        this.genderes = [
            {
                label: 'Unknown',
                value: 'Unknown',
            },
            {
                label: 'Male',
                value: 'Male',
            },
            {
                label: 'Female',
                value: 'Female',
            },
        ];
    }

    onRowEditInit(user: User) {
        this.clonedUsers[user.id] = { ...user };
    }

    onRowEditSave(data: User) {
        const indexUser = this.listUserData.findIndex(
            (user) => user.id === data.id
        );
        let objUser = this.listUserData[indexUser];
        objUser.dayOfBirth = new Date(objUser.dayOfBirth).getTime(); //convert dayOfBirth to milisecond

        this.userService.updateUser(objUser, data.id);
        delete this.clonedUsers[data.id];
    }

    onRowEditCancel(user: User, index: number) {
        this.listUserData[index] = this.clonedUsers[user.id];
        delete this.clonedUsers[user.id];
    }

    handleReplaceSpaceInString(value: string) {
        return value.replace(REGEX_CHECK_SPACE_STRING, '');
    }

    isEmpty(name: string) {
        return this.handleReplaceSpaceInString(name) === '';
    }

    checkLengthString(name: string) {
        return this.handleReplaceSpaceInString(name).length < 5 ||
            this.handleReplaceSpaceInString(name).length > 50
            ? true
            : false;
    }

    isValidFullName(name: string) {
        return REGEX_ONLY_STRING.test(name);
    }

    isValidEmail(email: string) {
        return REGEX_ISVALID_EMAIL.test(email);
    }

    isValidPhone(phone: string) {
        return !phone || REGEX_ISVALID_PHONE.test(phone);
    }

    isDisabled(user: User) {
        return this.isEmpty(user.fullName) ||
            this.isEmpty(user.email) ||
            this.checkLengthString(user.fullName) ||
            !this.isValidFullName(user.fullName) ||
            !this.isValidEmail(user.email) ||
            !this.isValidPhone(user.phone)
            ? true
            : false;
    }

    getEventValue(event: any) {
        return event.target.value;
    }
}
