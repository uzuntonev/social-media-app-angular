import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { IPost } from "src/app/shared/models/post";
import { PostService } from "../services/post.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() post: IPost;
  @ViewChild("likes", { static: false }) likes: ElementRef;
  @ViewChild("dislikes", { static: false }) dislikes: ElementRef;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {}

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

  getDetails(postId: string) {
    this.router.navigate(["posts", postId]);
  }

  deletePost() {
    this.postService.deletePost(this.post);
  }
}
