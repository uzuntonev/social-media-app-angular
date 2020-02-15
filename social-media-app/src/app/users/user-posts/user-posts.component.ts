import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-user-posts",
  templateUrl: "./user-posts.component.html",
  styleUrls: ["./user-posts.component.scss"]
})
export class UserPostsComponent implements OnInit {
  @Input() posts: any[];
  constructor(private router: Router) {}

  ngOnInit() {}

  getDetails(postId) {
    this.router.navigate(["post", postId]);
  }
}
