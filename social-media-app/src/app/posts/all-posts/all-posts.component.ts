import { Component, OnInit, DoCheck } from "@angular/core";
import { PostService } from "src/app/posts/post.service";
import { IPost } from "src/app/core/models/post";
import { tap, merge,  } from "rxjs/operators";

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
    this.postService.getAllPost
      .pipe(
        tap(post => this._allPosts.push(post)),
      )
      .subscribe();
  }

  ngDoCheck() {
    this.allPosts = [...this._allPosts];
  }
}
