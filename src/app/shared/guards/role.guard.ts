import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate, 
} from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    const user = this.authService.userValue;  
    
    if (Object.keys(user).length !== 0 && user.isAdmin) {
        return true;
    }
    this.router.navigate(['/login']);

    return false;
  }
}