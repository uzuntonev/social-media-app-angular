import { Component, OnInit } from "@angular/core";
import { PostService } from "../services/post.service";
import { IPost } from "../../shared/models/post";
import { Observable } from "rxjs";

@Component({
  selector: "app-all-posts",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  allPosts$: Observable<IPost[]>;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.allPosts$ = this.postService.getAllPost;
  }
}
