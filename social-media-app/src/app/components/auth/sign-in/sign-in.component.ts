import { Component, OnInit } from "@angular/core";
import { ILogin } from '../../../core/interfaces/Login';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

}
