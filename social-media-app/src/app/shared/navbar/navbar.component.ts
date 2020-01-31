import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from "@angular/core";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnChanges {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() isAuth: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
  }

  ngOnChanges() {}
  signOut() {
    this.authService.SignOut();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
