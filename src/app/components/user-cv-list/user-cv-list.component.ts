import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { map, first } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user-list.model';
import { CvListService } from 'src/app/services/cv-list.service';
import { CVTemplate } from 'src/app/shared/models/cv-template.model';

@Component({
    selector: 'app-user-cv-list',
    templateUrl: './user-cv-list.component.html',
    styleUrls: ['./user-cv-list.component.scss'],
})
export class UserCvListComponent implements OnInit {
    userData!: User;

    userCVList: Array<string> = [];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        // get id and cv list of current user
        this.userData = JSON.parse(localStorage.getItem('user') || '{}');
        this.userService
            .getUserByEmail(this.userData.email)
            .pipe(
                map((users: any) => users[0]),
                first()
            )
            .subscribe((response) => {
                this.userCVList = response.cvList.reverse();
            });
    }
}
