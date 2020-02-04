import { Component, OnInit, DoCheck } from "@angular/core";
import { IUser } from "../../core/models/user";
import { AuthService } from "../../auth/auth.service";
import { PostService } from "../../posts/post.service";
import { IPost } from "../../core/models/post";
import { UsersService } from "../users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { mergeMap, filter, tap } from "rxjs/operators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, DoCheck {
  user: IUser;
  private _posts: IPost[] = [];
  posts: IPost[];
  constructor(
    private postService: PostService,
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService
      .getUser(this.activateRoute.snapshot.params.id)
      .subscribe((user: IUser[]) => {
        this.user = user[0];
      });
    this.postService.getAllPost
      .pipe(
        filter(
          post => post.createdById === this.activateRoute.snapshot.params.id
        ),
        tap(post => this._posts.push(post))
      )
      .subscribe();
  }

  ngDoCheck() {
    this.posts = [...this._posts].sort();
  }

  getDetails(postId) {
    this.router.navigate(["posts", postId]);
  }
}
