import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { IUser } from 'src/app/core/models/user';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() isAuth: boolean;
  currentUser: IUser;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser
  }

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
  }

  signOut() {
    this.authService.SignOut();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
