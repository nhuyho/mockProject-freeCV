import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'mock-project';

    constructor(private router: Router) {}
    
    ngOnInit(): void {}

    isAdminLoggedIn(): boolean {  
        return this.router.url.includes('/admin') ? false : true;
    }
}
