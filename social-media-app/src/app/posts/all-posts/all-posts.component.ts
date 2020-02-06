import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "src/app/posts/post.service";
import { IPost } from "src/app/core/models/post";
import { Subscription } from "rxjs";

@Component({
  selector: "app-all-posts",
  templateUrl: "./all-posts.component.html",
  styleUrls: ["./all-posts.component.scss"]
})
export class AllPostsComponent implements OnInit, OnDestroy {
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
