import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { IPost } from "src/app/core/models/post";
import { ActivatedRoute } from "@angular/router";
import { IComment } from "src/app/core/models/comment";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  post: IPost;
  postId: string = this.activateRoute.snapshot.params.id;
  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  get author() {
    return JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).id
      : JSON.parse(localStorage.getItem("user")).uid;
  }
  ngOnInit() {
    this.postService.getPost(this.postId).subscribe(post => {
      this.postService.mapPostData(post.payload.data()).subscribe(post => {
        this.post = post;
      });
    });

    this.getAllComments();
  }

  addComment(value) {
    const comment: IComment = {
      avatar: this.authService.currentUser.avatar,
      content: value,
      createdBy: this.authService.currentUser.id,
      createdOn: new Date()
    };

    this.postService.addComment(comment, this.postId);
  }

  getAllComments() {
    return this.postService.getAllComments(this.postId).subscribe(x => {
      console.log(x);
    });
  }
}
