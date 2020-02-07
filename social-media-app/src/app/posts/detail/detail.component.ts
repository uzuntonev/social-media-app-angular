import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { PostService } from "../services/post.service";
import { IPost } from "../../shared/models/post";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { IUser } from "../../shared/models/user";

@Component({
  selector: "app-details",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit, OnDestroy {
  post: IPost;
  private subscription: Subscription;
  private userData: IUser;
  private afUserData: any;
  @ViewChild("likes", { static: false }) likes: ElementRef;
  @ViewChild("dislikes", { static: false }) dislikes: ElementRef;
  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
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
    this.postService
      .updateLikeDislike(id, "likes")
      .subscribe(_ => this.router.navigate([""]));
  }

  dislikePost(id) {
    this.postService
      .updateLikeDislike(id, "dislikes")
      .subscribe(_ => this.router.navigate([""]));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
