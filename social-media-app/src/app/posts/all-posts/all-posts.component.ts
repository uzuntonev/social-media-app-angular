import { Component, OnInit, DoCheck } from "@angular/core";
import { PostService } from "src/app/posts/post.service";
import { IPost } from "src/app/core/models/post";

@Component({
  selector: "app-all-posts",
  templateUrl: "./all-posts.component.html",
  styleUrls: ["./all-posts.component.scss"]
})
export class AllPostsComponent implements OnInit, DoCheck {
  allPosts: IPost[] = [];
  private _allPosts: IPost[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAllPost.subscribe((post: IPost) => this._allPosts.push(post));
  }

  ngDoCheck() {
    this.allPosts = [...this._allPosts];
  }
}
