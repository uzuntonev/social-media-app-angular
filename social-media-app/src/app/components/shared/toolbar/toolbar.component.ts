import { 
  Component, 
  OnInit, 
  Output,
  EventEmitter, 
  OnDestroy
} from '@angular/core';
// import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

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
    public authService: AuthService
  ) { }

  ngOnInit() {
    // this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      // this.isAuth = data;
    // });
    this.isAuth = this.authService.isLoggedIn
  }

  ngOnDestroy() {
    // this.isAuthSub.unsubscribe();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }


}
