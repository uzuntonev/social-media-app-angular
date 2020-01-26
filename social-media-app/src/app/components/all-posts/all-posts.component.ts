import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { IPost } from "src/app/core/interfaces/post";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-all-posts",
  templateUrl: "./all-posts.component.html",
  styleUrls: ["./all-posts.component.scss"]
})
export class AllPostsComponent implements OnInit {
  allPost: IPost[] = [];

  constructor(
    public postServices: PostService,
    private afs: AngularFireStorage
  ) {}

  ngOnInit() {
    this.postServices.getAllPost().then((posts: IPost[]) => {
      posts.map(post => {
        this.afs
          .ref(`/uploads/${post.imgName}`)
          .getDownloadURL()
          .subscribe(x => {console.log(x)});
      });
    });
  }
}
