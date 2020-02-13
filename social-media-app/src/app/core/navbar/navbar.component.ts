import { Component, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  get isAuth() {
    return this.authService.isLoggedIn;
  }

  get currentUser() {
    return this.authService.userData;
  }
  signOut() {
    this.authService.signOut();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
