import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { REGEX_ONLY_STRING } from 'src/app/app.constants';




@Component({
    selector: 'app-admin-user-detail',
    templateUrl: './admin-user-detail.component.html',
    styleUrls: ['./admin-user-detail.component.scss'],
})
export class AdminUserDetailComponent implements OnInit {
    public editForm!: FormGroup;
    userRef: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: UserService,
        public fb: FormBuilder,

    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        this.service.getUserDoc(id!).subscribe((res) => {
            this.userRef = res;
            this.editForm = this.fb.group({
                fullName: [
                    this.userRef.fullName,
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validators.pattern(REGEX_ONLY_STRING)
                    ],
                ],
                email: [
                    this.userRef.email,
                    [
                        Validators.required,
                        Validators.pattern(
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                        ),
                    ],
                ],
                gender: [this.userRef.gender],
                note: [this.userRef.note],
                status: [this.userRef.status],
                phone: [
                    this.userRef.phone,
                    [
                        Validators.minLength(10),
                        Validators.maxLength(11),
                        Validators.pattern(/^[0-9]*$/),
                    ],
                ],
                dayOfBirth: [ formatDate(this.userRef.dayOfBirth, 'yyyy-MM-dd', 'en')  ],
                avatar: [this.userRef.avatar],
            });
        });
    }

    onSubmit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.service.updateUser(this.editForm.value, id!);
        this.router.navigate(['admin/users']);
    }
}


