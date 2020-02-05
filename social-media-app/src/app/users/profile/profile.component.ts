import { Component, OnInit } from "@angular/core";
import { UsersService } from "../users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getAllUsers
      .pipe(filter(post => post.id === this.activateRoute.snapshot.params.id))
      .subscribe(user => (this.user = user));
  }

  getDetails(postId) {
    this.router.navigate(["posts", postId]);
  }
}
