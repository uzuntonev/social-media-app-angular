import { Component } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"]
})
export class VerifyEmailComponent {
  currentUser = this.authService.userData;
  constructor(private authService: AuthService, private router: Router) {}

  sendVerificationMail() {
    this.authService.sendVerificationMail();
  }
  navigateMyProfile(){
    this.router.navigate(["user", this.currentUser.id])
  }
}
