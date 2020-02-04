import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  DoCheck
} from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { IUser } from "src/app/core/models/user";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, DoCheck {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() isAuth: boolean;
  currentUser: IUser;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
  }

  ngDoCheck() {
    this.currentUser = this.authService.currentUser

  }

  signOut() {
    this.authService.SignOut();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
