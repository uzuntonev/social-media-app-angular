import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { IPost } from "../../shared/interfaces/post";
import { PostService } from "../services/post.service";
import { Router, ActivatedRoute } from "@angular/router";
import { IUser } from "../../shared/interfaces/user";
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() post: IPost;
  @ViewChild("likes", { static: false }) likes: ElementRef;
  @ViewChild("dislikes", { static: false }) dislikes: ElementRef;
  private userData: IUser;
  isDetailPage = !!this.activatedRoute.snapshot.params.id;
  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userData = this.authService.userData;
  }

  ngOnInit() {}

  get isAuthor() {
    return this.userData.id === this.post.createdById;
  }

  likePost(postId) {
    const value = this.likes.nativeElement.textContent;
    this.postService
      .updateLikeDislike(postId, "likes", value)
      .then(() => {
        this.router.onSameUrlNavigation;
      })
      .catch(err => console.error(err));
  }

  dislikePost(postId) {
    const value = this.dislikes.nativeElement.textContent;
    this.postService
      .updateLikeDislike(postId, "dislikes", value)
      .then(() => {
        this.router.onSameUrlNavigation;
      })
      .catch(err => console.error(err));
  }

  getDetails(postId: string) {
    this.router.navigate(["post", postId]);
  }

  deletePost() {
    this.postService.deletePost(this.post);
  }
}
