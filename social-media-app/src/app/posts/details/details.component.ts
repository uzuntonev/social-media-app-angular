import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../post.service";
import { IPost } from "src/app/core/models/post";
import { ActivatedRoute } from "@angular/router";
import { mergeMap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { IUser } from "src/app/core/models/user";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit, OnDestroy {
  post: IPost;
  private subscription: Subscription;
  private userData: IUser;
  private afUserData: any;
  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.userData = this.authService.userData;
    this.afUserData = this.authService.afUserData;
  }

  get author() {
    return this.userData ? this.userData.id : this.afUserData.uid;
  }

  ngOnInit() {
    const postId: string = this.activateRoute.snapshot.params.id;
    this.subscription = this.postService
      .getPost(postId)
      .subscribe((post: IPost) => {
        this.post = post;
      });
  }

  deletePost() {
    this.postService.deletePost(this.post);
  }

  likePost(id) {
    this.postService.likePost(id);
  }
  dislikePost(id) {
    this.postService.dislikePost(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
