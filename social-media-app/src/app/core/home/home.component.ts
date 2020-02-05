import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { IUser } from "../models/user";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  currentUser: IUser;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }
  get isAuth() {
    return this.authService.isLoggedIn;
  }
}
