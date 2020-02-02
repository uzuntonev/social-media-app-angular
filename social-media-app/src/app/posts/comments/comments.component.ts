import { Component, OnInit, Input } from "@angular/core";
import { IComment } from "src/app/core/models/comment";
import { PostService } from "../post.service";
import { IPost } from "src/app/core/models/post";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  @Input() post: IPost;
  private _allComments: IComment[] = [];
  allComments: IComment[] = [];
  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.postService
      .getAllComments(this.post.id)
      .subscribe((allComments: IComment[]) => {
        this._allComments = [...allComments];
      });
  }

  ngDoCheck() {
    this.allComments = [...this._allComments];
  }
  addComment(value) {
    const comment: IComment = {
      avatar: this.authService.currentUser.avatar,
      content: value,
      createdBy: this.authService.currentUser.fullName,
      createdOn: new Date()
    };

    this.postService.addComment(comment, this.post.id);
  }
}
