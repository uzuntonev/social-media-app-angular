import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
  OnChanges
} from "@angular/core";
// import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit, OnDestroy, OnChanges {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() isAuth: boolean;
  logoRoute: string;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
    
  }

  ngOnChanges(){
    this.logoRoute = this.isAuth ? '/all-posts' : '/home'
  }

  ngOnDestroy() {

  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
