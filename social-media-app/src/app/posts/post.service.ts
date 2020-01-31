import { Injectable, NgZone } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { IUser } from "../core/models/user";
import { IPost } from "../core/models/post";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: "root"
})
export class PostService {
  likes: number;
  dislikes: number;
  constructor(
    private afDb: AngularFirestore,
    private router: Router,
    private afs: AngularFireStorage
  ) {}

  addPost(post: Observable<IPost>) {
    this.router.navigate(["posts"]);
    post.subscribe(post => this.savePostInDb(post));
  }

  savePostInDb(post) {
    this.afDb
      .collection("users", ref => {
        return ref.where("id", "==", post.createdById).limit(1);
      })
      .snapshotChanges()
      .subscribe({
        next: () => {
          return this.afDb
            .collection("posts")
            .doc(post.id)
            .set(post, {
              merge: true
            });
        },
        error: err => console.error(err)
      });
  }

  get getAllPost() {
    return this.afDb
      .collection("posts")
      .ref.get()
      .then(allPosts => {
        return allPosts.docs.map(post => post.data());
      });
  }

  mapPostData(post) {
    return this.afs
      .ref(`/uploads/${post.imgName}`)
      .getDownloadURL()
      .pipe(
        map(x => {
          return {
            ...post,
            imgName: x
          };
        })
      );
  }

  increaseLikesDislikes(id, prop) {
    return this.afDb
      .collection("posts")
      .doc(id)
      .get()
      .subscribe(x => {
        this[prop] = Number(x.data()[prop]) + 1;
        this.router.navigate(["home"]);
        return this.afDb
          .collection("posts")
          .doc(id)
          .set(
            {
              [prop]: this[prop]
            },
            { merge: true }
          );
      });
  }

  likePost(id) {
    this.increaseLikesDislikes(id, "likes");
  }

  dislikePost(id) {
    this.increaseLikesDislikes(id, "dislikes");
  }

  deletePost(id) {
    this.afDb
      .collection("posts")
      .doc(id)
      .delete();
    this.router.navigate(["home"]);
  }

  getPost(id) {}
}
