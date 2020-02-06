import { Component, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { IUser } from "../models/user";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  get isAuth() {
    return this.authService.isLoggedIn;
  }

  get currentUser() {
    return this.authService.userData;
  }
}
