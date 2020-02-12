import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { IComment } from "src/app/shared/models/comment";
import { PostService } from "../services/post.service";
import { IPost } from "src/app/shared/models/post";
import { AuthService } from "src/app/auth/services/auth.service";
import { Observable } from "rxjs";
import { DocumentData } from "@angular/fire/firestore";
import { NgForm } from "@angular/forms";
import { IUser } from "src/app/shared/models/user";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  // isDetailPage: boolean;
  // @ViewChild("likes", { static: false }) likes: ElementRef;
  // @ViewChild("dislikes", { static: false }) dislikes: ElementRef;
  @Input() post: IPost;
  allComments$: Observable<DocumentData[]>;
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.allComments$ = this.postService.getAllComments(this.post.id);
    // this.isDetailPage = !!this.activatedRoute.snapshot.params.id;
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

  // get author() {
  //   return this.userData.id
  // }

  // likeComment(commentId){
  //   const value = this.likes.nativeElement.textContent;
  //   this.postService
  //     .updateLikeDislike(commentId, "likes", value)
  //     .then(() => {
  //       this.router.onSameUrlNavigation;
  //     })
  //     .catch(err => console.error(err));
  // }

  // dislikeComment(commentId){
  //   const value = this.dislikes.nativeElement.textContent;
  //   this.postService
  //     .updateLikeDislike(commentId, "dislikes", value)
  //     .then(() => {
  //       this.router.onSameUrlNavigation;
  //     })
  //     .catch(err => console.error(err));
  // }

  // deleteComment(){}
}
