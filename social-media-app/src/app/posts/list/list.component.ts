import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../services/post.service";
import { IPost } from "../../shared/models/post";
import { Subscription } from "rxjs";

@Component({
  selector: "app-all-posts",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnDestroy {
  allPosts: IPost[] = [];
  private subscription: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.subscription = this.postService.getAllPost.subscribe((post: IPost) =>
      this.allPosts.push(post)
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
