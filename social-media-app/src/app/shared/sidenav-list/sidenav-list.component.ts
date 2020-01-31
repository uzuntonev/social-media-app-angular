import { Component, OnInit, OnDestroy, Input } from "@angular/core";
// import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.scss"]
})
export class SidenavListComponent implements OnInit {
  @Input() isAuth: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
  }

  signOut(){
    this.authService.SignOut()
  }
}
