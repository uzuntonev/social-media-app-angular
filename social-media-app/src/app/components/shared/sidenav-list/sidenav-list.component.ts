import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  isAuthSub: Subscription;

  constructor(
    // private authService: AuthService
  ) { }

  ngOnInit() {
    // this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
    //   this.isAuth = data;
    // });
  }

  ngOnDestroy() {
    // this.isAuthSub.unsubscribe();
  }

  logout() {
    // this.authService.logout();
  }
}
