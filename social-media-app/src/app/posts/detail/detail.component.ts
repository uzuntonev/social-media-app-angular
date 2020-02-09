import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../services/post.service";
import { IPost } from "../../shared/models/post";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-details",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit, OnDestroy {
  post: IPost;
  private subscription: Subscription;
  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const postId: string = this.activateRoute.snapshot.params.id;
    this.subscription = this.postService
      .getPost(postId)
      .subscribe((post: IPost) => {
        this.post = post;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
