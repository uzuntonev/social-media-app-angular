import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"]
})
export class VerifyEmailComponent implements OnInit {
  currentUser = this.authService.userData;
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  sendVerificationMail() {
    this.authService.SendVerificationMail();
  }
}
