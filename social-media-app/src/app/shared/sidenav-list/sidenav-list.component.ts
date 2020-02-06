import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { IUser } from "src/app/core/models/user";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.scss"]
})
export class SidenavListComponent implements OnInit {
  @Input() isAuth: boolean;
  currentUser: IUser;
  constructor(private authService: AuthService) {
    this.currentUser = this.authService.userData;
  }

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
  }

  signOut() {
    this.authService.SignOut();
  }
}
