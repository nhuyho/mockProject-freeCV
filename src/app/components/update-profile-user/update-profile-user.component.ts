import { REGEX_ISVALID_PHONE, REGEX_ONLY_STRING, REGEX_ISVALID_EMAIL } from 'src/app/app.constants';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user-list.model';
import { first, map } from 'rxjs/operators';
import { formatDate } from '@angular/common'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-profile-user',
  templateUrl: './update-profile-user.component.html',
  styleUrls: ['./update-profile-user.component.scss']
})
export class UpdateProfileUserComponent implements OnInit {
  updateProfile!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  userData!: User;
  idUser!: string;  
  avatarFile!: File; 
  iconCamera =  'assets/images/icons/camera.png';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    const dateNow = new Date().getTime();
    this.userService.getUserByEmail(this.userData.email)
        .pipe(
          map((users: any) => users[0])
        ).subscribe((user) => {
          this.idUser = user.id;
          this.updateProfile = this.fb.group({
            fullName: [user.fullName ,[Validators.required, Validators.pattern(REGEX_ONLY_STRING)]],
            email: [user.email, [Validators.required, Validators.pattern(REGEX_ISVALID_EMAIL)]],
            phone: [user.phone, [Validators.pattern(REGEX_ISVALID_PHONE)]],
            dayOfBirth:  [formatDate(user.dayOfBirth || dateNow, 'yyyy-MM-dd', 'en')] ,
            gender: user.gender,
            avatar: user.avatar
          })
        });
  }

  handleUpdateProfileUser(formValue: any) { 
    this.submitted = true;

    if(this.updateProfile.invalid) {
      return;
    }
    this.loading = true;
    const user = {
      ...formValue,
      note: this.userData.note || '',
      status: this.userData.status || '',
      avatar: this.userService.urlImage !== undefined ? this.userService.urlImage : formValue.avatar
    };
    this.userService.updateUser(user, this.idUser)
        .then(() => {
          user.dayOfBirth = new Date(user.dayOfBirth).getTime();
          const newData = Object.assign(this.userData, user);
          localStorage.setItem('user', JSON.stringify(newData));
          this.authService.userSubject.next(newData);
          this.toastr.success('Update Successfully !');
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        }); 
  }

  updateAvatar(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
        const  avatarInput = event.target.files[0];;

        this.avatarFile = avatarInput;

        reader.readAsDataURL(avatarInput);
        reader.onload = (e: any) => {
            this.updateProfile.patchValue({
                avatar: e.target.result,
            });
        };

      this.userService.updateImage(this.avatarFile);
    }
  }
}
