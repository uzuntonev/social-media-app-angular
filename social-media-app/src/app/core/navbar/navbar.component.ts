import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  DoCheck,
  AfterViewInit
} from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";
import { IUser } from "src/app/shared/models/user";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit{
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  get isAuth() {
    return this.authService.isLoggedIn;
  }

  get currentUser() {
    return this.authService.userData;
  }
  signOut() {
    this.authService.SignOut();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
