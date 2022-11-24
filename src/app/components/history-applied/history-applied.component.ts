import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core'; 
import { JobApplied, User } from 'src/app/shared/models/user-list.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history-applied',
  templateUrl: './history-applied.component.html',
  styleUrls: ['./history-applied.component.scss']
})
export class HistoryAppliedComponent implements OnInit {
  userData!: User;
  listJobApplied!: JobApplied[];
  sub!: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.sub = this.userService.getUserByEmail(this.userData.email).pipe(
      map((user: any) => { 
        return user[0].historyApplied;
      }),
    ).subscribe((response: any) => {
      this.listJobApplied = response;
    });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
