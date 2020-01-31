import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signIn(email: string, password: string){
    this.authService.SignIn(email, password)
  }

  signInGoogle(){
    this.authService.GoogleAuth()
  }
}
