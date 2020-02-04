import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { IPost } from "src/app/core/models/post";
import { ActivatedRoute } from "@angular/router";
import { mergeMap } from "rxjs/operators";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  post: IPost;
  postId: string = this.activateRoute.snapshot.params.id;
  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute
  ) {}

  get author() {
    return JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).id
      : JSON.parse(localStorage.getItem("user")).uid;
  }

  ngOnInit() {
    this.postService
      .getPost(this.postId)
      .pipe(mergeMap(post => post))
      .subscribe(post => {
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
}
