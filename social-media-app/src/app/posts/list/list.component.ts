import { Component, OnInit } from "@angular/core";
import { PostService } from "../services/post.service";
import { IPost } from "../../shared/interfaces/post";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-all-posts",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  allPosts$: Observable<IPost[]>;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.allPosts$ = this.postService.getAllPost();
  }
}
