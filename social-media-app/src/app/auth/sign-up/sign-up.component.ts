import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { auth } from 'firebase';

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

  signUp(
    email: string,
    password: string,
    repassword: string,
    name: string,
    avatar
  ) {
    this.authService.SignUp(email, password, repassword, name, avatar);
  }

  signUpGoogle(){
    this.authService.GoogleAuth()
  }
}
