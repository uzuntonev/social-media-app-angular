import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { IUser } from "src/app/shared/models/user";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.scss"]
})
export class SidenavListComponent implements OnInit {
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
}
