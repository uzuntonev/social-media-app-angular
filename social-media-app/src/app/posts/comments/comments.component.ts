import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { IComment } from "src/app/shared/interfaces/comment";
import { PostService } from "../services/post.service";
import { IPost } from "src/app/shared/interfaces/post";
import { AuthService } from "src/app/auth/services/auth.service";
import { Observable } from "rxjs";
import { DocumentData } from "@angular/fire/firestore";
import { NgForm } from "@angular/forms";

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
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.allComments$ = this.postService.getAllComments(this.post.id);
  }

  addComment(form: NgForm) {
    const comment: IComment = {
      id: Math.random().toString(),
      avatar: this.authService.userData.avatar,
      content: form.value.comment,
      createdBy: this.authService.userData.name,
      createdOn: new Date(),
      likes: 0,
      dislikes: 0
    };

    this.postService.addComment(comment, this.post.id);
    form.reset();
  }

}
