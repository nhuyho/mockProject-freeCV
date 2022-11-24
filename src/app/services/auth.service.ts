import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../shared/models/user-list.model';
 

@Injectable({ providedIn: 'root' })
export class AuthService {
    userSubject: BehaviorSubject<any>;
    user: Observable<User>;

    constructor(
        private router: Router, 
        private socialAuthService: SocialAuthService,
        private ngFirestore: AngularFirestore, 
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    get userValue(): User {
        return this.userSubject.value;
    }
 
    login(user: any) {
        const {email, password} = user;
        return this.ngFirestore.collection('users', ref => {
            let query :  firebase.default.firestore.Query = ref; 
            query = query.where('email', '==', email)
                        .where('password', '==', password) ; 
            return query;
        })
        .valueChanges() 
        .pipe( 
            map((users: any) => {
                    users[0].type = 'local'; 
                    localStorage.setItem('user', JSON.stringify(users[0]));
                    this.userSubject.next(users[0]);
                    return users;
            }),
            catchError(() => throwError('Email or password is incorrect'))
        )
    }
    loginSocial(socialPlatform: string) {
        let socialPlatformProvider; 
        socialPlatform === 'facebook' ? socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID : socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
            if(userData !== null) {
              const {email, lastName, firstName, idToken, photoUrl, provider} = userData;
              const dateNow = new Date().getTime();
              const user = {
                email,
                fullName: `${firstName} ${lastName}`, 
                token: idToken,
                avatar: photoUrl,
                type: provider,
                isAdmin: false,
                gender: 'Unknown',
                status: 'None',
                dayOfBirth: dateNow,
                phone: ''
              }
              this.userSubject.next(user);
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['/']);

              this.ngFirestore.collection('users', ref => {
                  let query: firebase.default.firestore.Query = ref;
                  return query.where('email','==', email);
              }).valueChanges().subscribe((resData) => {
                    if(resData.length === 0) {
                        this.ngFirestore.collection('users').add(user);
                    } 
              })
            }
          });
    }

    logout() {  
        const user = this.userValue;
        if(user.type !== 'local') { 
            this.socialAuthService.signOut();
        }  
        this.userSubject.next(undefined);
        localStorage.removeItem('user');
    }
 
    register(user: User) { 
        const { fullName, email, password} = user; 
        
        return  this.ngFirestore.collection('users', ref => {
            let query:  firebase.default.firestore.Query = ref; 
            return query.where('email', '==', email);  
        })
        .valueChanges()
        .pipe(
            tap((resData) => { 
                if(resData.length > 0) { 
                     throw new Error(`email ${email} is already taken`); 
                } else { 
                    const dateNow = new Date().getTime();
                    const userData = { 
                        avatar: 'https://w7.pngwing.com/pngs/954/328/png-transparent-computer-icons-user-profile-avatar-heroes-head-recruiter-thumbnail.png',
                        isAdmin: false,
                        fullName,
                        email,
                        password,
                        gender: 'Unknown',
                        status: 'None',
                        dayOfBirth: dateNow,
                        phone: ''
                    }
                    this.ngFirestore.collection('users').add(userData);
                    return userData;
                }
            }),
            catchError((error)=> throwError(error))
        );  
    }
 
    get getCurrentUser() 
    {
        return this.user;
    } 
}