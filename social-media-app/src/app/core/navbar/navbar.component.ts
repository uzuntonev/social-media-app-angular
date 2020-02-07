import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  DoCheck,
  AfterViewInit
} from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";
import { IUser } from "src/app/shared/models/user";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, DoCheck, AfterViewInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() isAuth: boolean;
  @Input() currentUser: IUser;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
    console.log(this.isAuth);
  }

  ngAfterViewInit(){

  }
  ngDoCheck() {
   

  }

  signOut() {
    this.authService.SignOut();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
