import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { IUser } from "src/app/shared/models/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;
  private userListSubscription: Subscription;
  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userListSubscription = this.userService
      .getUser(this.activateRoute.snapshot.params.id)
      .subscribe(user => this.user = user);
  }

  resetPassword() {
    this.router.navigate(["auth", "forgot-password"]);
  }

  deleteAccount(userId) {
    this.userService.deleteUser(userId);
  }

  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
  }
}
