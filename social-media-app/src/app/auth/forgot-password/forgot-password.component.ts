import { Component } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent {
  isAuth = this.authService.isLoggedIn
  constructor(private authService: AuthService) {}

  forgotPassword(value) {
    this.authService.forgotPassword(value.email);
  }
}
