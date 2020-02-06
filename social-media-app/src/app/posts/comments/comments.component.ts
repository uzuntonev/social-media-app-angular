import { Component, OnInit, Input } from "@angular/core";
import { IComment } from "src/app/core/models/comment";
import { PostService } from "../post.service";
import { IPost } from "src/app/core/models/post";
import { AuthService } from "src/app/auth/auth.service";
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  @Input() post: IPost;
  allComments$: Observable<DocumentData[]>;
  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
  this.allComments$ =  this.postService
      .getAllComments(this.post.id) 
  }

  addComment(value: string) {
    const comment: IComment = {
      avatar: this.authService.userData.avatar,
      content: value,
      createdBy: this.authService.userData.name,
      createdOn: new Date()
    };

    this.postService.addComment(comment, this.post.id);
  }
}
