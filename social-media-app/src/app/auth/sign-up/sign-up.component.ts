import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  avatars: { value: string; link: string }[] = [
    {
      value: "Man",
      link: "assets/images/avatar-man.png"
    },
    {
      value: "Women",
      link: "assets/images/avatar-women.png"
    }
  ];
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signUp(value) {
    this.authService.SignUp(value);
  }

  signUpGoogle() {
    this.authService.GoogleAuth();
  }
}
