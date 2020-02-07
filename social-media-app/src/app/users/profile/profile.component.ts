import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;
  private subscription: Subscription;
  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
   this.subscription = this.userService.getAllUsers
      .pipe(filter(post => post.id === this.activateRoute.snapshot.params.id))
      .subscribe(user => (this.user = user));
  }

  getDetails(postId) {
    this.router.navigate(["post", postId]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
