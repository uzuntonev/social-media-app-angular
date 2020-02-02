import { Component, OnInit, Input } from "@angular/core";
import { IPost } from "src/app/core/models/post";
import { PostService } from '../post.service';

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() post: IPost;
  constructor(private postService: PostService) {}

  ngOnInit() {}

  likePost(id) {
    this.postService.likePost(id);
  }
  dislikePost(id) {
    this.postService.dislikePost(id);
  }

  substringPost(post) {
    return post.length > 100 ? post.substring(0, 200) + "..." : post;
  }
}
