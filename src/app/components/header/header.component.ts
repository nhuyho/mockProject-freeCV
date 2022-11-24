import {  Component, OnInit } from '@angular/core'; 
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user-list.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    userToken: string | null  = '';
    userData!: User;
    constructor( private authService: AuthService) {}

    ngOnInit(): void {
        this.userData = JSON.parse(localStorage.getItem('user') || '{}');
        this.userToken = this.userData?.token || '';
        this.authService.getCurrentUser.subscribe((data) => {
            if(data && Object.keys(data).length) { 
                this.userToken = data.token;
                this.userData = data;
            }
        }) 
    } 
    
    signOut(): void { 
        this.authService.logout();
    }
}
