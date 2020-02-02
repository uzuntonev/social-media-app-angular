import {
  Component,
  OnInit,
  DoCheck,
} from "@angular/core";
import { PostService } from "src/app/posts/post.service";
import { IPost } from "src/app/core/models/post";
import { tap } from "rxjs/operators";


@Component({
  selector: "app-all-posts",
  templateUrl: "./all-posts.component.html",
  styleUrls: ["./all-posts.component.scss"]
})
export class AllPostsComponent implements OnInit, DoCheck {
  allPosts: IPost[] = [];
  private _allPosts: IPost[] = [];

  // allUsers: IUser[] = [];
  // private _allUsers: any[] = [];
  // isFriend: boolean;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAllPost
      .pipe(
        tap(allPost =>
          allPost.map(p => p.subscribe(x => this._allPosts.push(x)))
        )
      )
      .subscribe();

    // this.postService.getAllUsers.subscribe((users: IUser[]) => {
    // this.allUsers = users;
    // });
  }

  ngDoCheck() {
    this.allPosts = [...this._allPosts];
    // console.log(this._allPosts);    // this.allUsers = [...this._allUsers];
  }

  likePost(id) {
    this.postService.likePost(id);
  }
  dislikePost(id) {
    this.postService.dislikePost(id);
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
