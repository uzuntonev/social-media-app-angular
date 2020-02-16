import { Component } from "@angular/core";
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  get isReady(): boolean {
    return this.authService.userData !== undefined;
  }
  constructor(private authService: AuthService) {
  }
}
