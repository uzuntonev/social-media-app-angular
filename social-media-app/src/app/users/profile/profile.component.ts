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
    this.userListSubscription = this.userService.getAllUsers
      .pipe(
        filter(
          (user: IUser) => user.id === this.activateRoute.snapshot.params.id
        )
      )
      .subscribe(user => (this.user = user));
  }

  getDetails(postId) {
    this.router.navigate(["post", postId]);
  }

  resetPassword() {
    this.router.navigate(["auth", "forgot-password"]);
  }
  
  deleteAccount(userId) {
    window.alert("Are you sure ?")
    this.userService.deleteUser(userId)
  }

  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
  }
}
