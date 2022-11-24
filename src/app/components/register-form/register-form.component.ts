import { REGEX_ISVALID_EMAIL, REGEX_ONLY_STRING } from './../../app.constants';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit, OnDestroy { 
  registerForm!: FormGroup;
  loading: boolean =  false;
  submitted: boolean = false;
  sub!: Subscription;
  
  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {  
    this.registerForm = this.fb.group({
      fullName: ['',[Validators.required, Validators.pattern(REGEX_ONLY_STRING)]],
      email: ['', [Validators.required, Validators.pattern(REGEX_ISVALID_EMAIL) ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]] 
    },{ validator: this.checkPassword()});
 
    if (this.authService.userValue && Object.keys(this.authService.userValue).length) {
      this.router.navigate(['/']);
    }
  } 

  checkPassword()  {
    return (control: AbstractControl): ValidationErrors | null  => {
      const password = control.value.password;
      const rePassword = control.value.rePassword;
      return password !== '' && rePassword !== '' && password !== rePassword ? {isEqual: true} : null;
    };
  }

  loginSocial(socialPlatform: string): void {
    this.authService.loginSocial(socialPlatform);
  }

  handleRegister(formValue: any) { 
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true; 
    this.sub =  this.authService.register(formValue)
    .subscribe({
        next: () => {
            this.toastr.success('Registration successful');
            this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
            this.toastr.error(error);
            this.loading = false;
        }
    });
  }

  ngOnDestroy(): void {
    if(this.sub) { 
      this.sub.unsubscribe();
    }
  }
}
