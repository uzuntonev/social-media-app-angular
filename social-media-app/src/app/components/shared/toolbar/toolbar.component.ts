import { 
  Component, 
  OnInit, 
  Output,
  EventEmitter, 
  OnDestroy
} from '@angular/core';
// import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  isAuthSub: Subscription;

  constructor(
    // private authService: AuthService
  ) { }

  ngOnInit() {
    // this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      // this.isAuth = data;
    // });
  }

  ngOnDestroy() {
    // this.isAuthSub.unsubscribe();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    // this.authService.logout();
  }
}
