import { Injectable, NgZone } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { IUser } from "../core/models/user";
import { IPost } from "../core/models/post";
import { map } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(
    private afDb: AngularFirestore,
    private router: Router,
    private afs: AngularFireStorage,
    private authService: AuthService,
  ) {}

  createPost(post: IPost) {
    this.afDb
      .collection("posts")
      .doc(post.id)
      .set(post, {
        merge: true
      });
    this.router.navigate(["posts"]);
  }

  get getAllPost() {
    return this.afDb
      .collection("posts", ref => {
        return ref.orderBy("createdOn", "asc");
      })
      .valueChanges()
      .pipe(
        map(allPost => {
          return allPost.map(post => {
            return this.mapPostData(post);
          });
        })
      );
  }

  private mapPostData(post) {
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
        this.router.navigate([''])
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
    this.router.navigate([""]);
  }

  getPost(id) {
    return this.afDb
      .collection("posts")
      .doc(id)
      .valueChanges()
      .pipe(
        map(post => {
          return this.mapPostData(post)
        })
      );
  }

  addComment(comment, postId) {
    return this.afDb
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add(comment);
  }

  getAllComments(postId) {
    return this.afDb
      .collection("posts")
      .doc(postId)
      .collection("comments", ref => {
        return ref.orderBy("createdOn", "asc");
      })
      .valueChanges();
  }

}
