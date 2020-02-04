import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { IPost } from "src/app/core/models/post";
import { PostService } from "../post.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() post: IPost;
  @ViewChild("likes", { static: false }) likes: ElementRef;
  @ViewChild("dislikes", { static: false }) dislikes: ElementRef;
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {}
  ngAfterViewInit() {
    // console.log();
  }
  likePost(id) {
    // this.likes.nativeElement.textContent = +this.likes.nativeElement.textContent + 1
    this.postService.likePost(id);
  }

  dislikePost(id) {
    // this.dislikes.nativeElement.textContent = +this.dislikes.nativeElement.textContent + 1
    this.postService.dislikePost(id);
  }

  substringPost(description: string) {
    return description.length > 200
      ? description.substring(0, 200) + "..."
      : description;
  }

  getDetails(postId: string) {
    this.router.navigate(["posts", postId]);
  }
}
