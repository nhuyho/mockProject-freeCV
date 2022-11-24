import { REGEX_ISVALID_EMAIL } from 'src/app/app.constants';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 


@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
    loginForm!: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private toastr: ToastrService, 
    ) {} 

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: [
                '',
                [Validators.required, Validators.pattern(REGEX_ISVALID_EMAIL)],
            ],
            password: ['', Validators.required],
        });
        
        if (this.authService.userValue && Object.keys(this.authService.userValue).length) {
            this.router.navigate(['/']);
        }  
    }
 
    loginSocial(socialPlatform: string): void {
        this.authService.loginSocial(socialPlatform);
    }

    handleLogin(formValue: any) {
        this.submitted = true;
        
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService
            .login(formValue)
            .subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: (error) => {
                    this.toastr.error(error);
                    this.loading = false;
                },
            });
    }
}
