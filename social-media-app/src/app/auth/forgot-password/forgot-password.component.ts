import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  forgotPassword(value) {
    this.authService.ForgotPassword(value.email);
  }
}
