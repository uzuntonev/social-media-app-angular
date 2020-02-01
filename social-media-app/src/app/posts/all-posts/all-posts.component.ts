import { Component, OnInit, OnDestroy, DoCheck } from "@angular/core";
import { PostService } from "src/app/posts/post.service";
import { IPost } from "src/app/core/models/post";
import { IUser } from "src/app/core/models/user";

import { Router } from "@angular/router";

@Component({
  selector: "app-all-posts",
  templateUrl: "./all-posts.component.html",
  styleUrls: ["./all-posts.component.scss"]
})
export class AllPostsComponent implements OnInit, DoCheck {
  allPost: IPost[] = [];
  private _allPosts: IPost[] = [];
  allUsers: IUser[] = [];
  private _allUsers: any[] = [];
  isFriend: boolean;
  constructor(private postService: PostService, private router: Router) {}

  get author() {
    return JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).id
      : JSON.parse(localStorage.getItem("user")).uid;
  }

  ngOnInit() {
    this.postService.getAllPost.subscribe(allPost => {
      allPost.map(post => {
        this.postService
          .mapPostData(post)
          .subscribe(p => this._allPosts.push(p));
      });
    });

    // this.postService.getAllUsers.subscribe((users: IUser[]) => {
    // this.allUsers = users;
    // });
  }

  ngDoCheck() {
    // this.allUsers = [...this._allUsers];
    this.allPost = [...this._allPosts];
  }

  likePost(id) {
    this.postService.likePost(id);
  }
  dislikePost(id) {
    this.postService.dislikePost(id);
  }
  deletePost(id) {
    this.postService.deletePost(id);
  }

  // addFriend(friend) {
  //   this.postService.addFriend(friend);
  // }

  substringPost(post) {
    return post.length > 100 ? post.substring(0, 200) + "..." : post;
  }
  // deleteFriend(friend) {
  //   this.postService.deleteFriend(friend)
  // }
}
