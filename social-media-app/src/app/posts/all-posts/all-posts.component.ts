import { Component, OnInit, OnDestroy, DoCheck } from "@angular/core";
import { PostService } from "src/app/posts/post.service";
import { IPost } from "src/app/core/models/post";

@Component({
  selector: "app-all-posts",
  templateUrl: "./all-posts.component.html",
  styleUrls: ["./all-posts.component.scss"]
})
export class AllPostsComponent implements OnInit, DoCheck {
  allPost: IPost[] = [];
  private _allPost: IPost[] = [];

  constructor(private postService: PostService) {}

  get author() {
    return JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).id
      : JSON.parse(localStorage.getItem("user")).uid;
  }

  ngOnInit() {
    this.postService.getAllPost.then(allPosts => {
      return allPosts.map(post => {
        this.postService
          .mapPostData(post)
          .subscribe(x => this._allPost.push(x));
      });
    });
  }

  ngDoCheck() {
    this.allPost = [...this._allPost];
  }


  likePost(id) {
    this.postService.likePost(id)
  }
  dislikePost(id) {
    this.postService.dislikePost(id)
  }
  deletePost(id) {
    this.postService.deletePost(id)
  }
}
