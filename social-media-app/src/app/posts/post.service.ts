import { Injectable, NgZone } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { IPost } from "../core/models/post";
import { map, mergeMap, delay } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import { IComment } from "../core/models/comment";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(
    private afDb: AngularFirestore,
    private router: Router,
    private afs: AngularFireStorage
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
        return ref.orderBy("createdOn", "desc");
      })
      .valueChanges()
      .pipe(
        mergeMap((allPost: IPost[]) => {
          return allPost.map((post: IPost) => {
            if (!post) {
              return;
            }
            return this.mapPostData(post);
          });
        }),
        mergeMap(post => post)
      );
  }

  private mapPostData(post: IPost) {
    return this.afs
      .ref(`/uploads/${post.imgName}`)
      .getDownloadURL()
      .pipe(
        map(x => {
          return {
            ...post,
            imageLink: x
          };
        })
      );
  }

  increaseLikesDislikes(id: string, prop: string) {
    return this.afDb
      .collection("posts")
      .doc(id)
      .get()
      .subscribe(x => {
        this[prop] = Number(x.data()[prop]) + 1;
        this.afDb
          .collection("posts")
          .doc(id)
          .set(
            {
              [prop]: this[prop]
            },
            { merge: true }
          );
        this.router.navigate([""]);
      });
  }

  likePost(id: string) {
    this.increaseLikesDislikes(id, "likes");
  }

  dislikePost(id: string) {
    this.increaseLikesDislikes(id, "dislikes");
  }

  deletePost(post: IPost) {
    this.afDb
      .collection("posts")
      .doc(post.id)
      .delete();

    this.afs.ref(`/uploads/${post.imgName}`).delete();
    this.router.navigate([""]);
  }

  getPost(id: string) {
    return this.afDb
      .collection("posts")
      .doc(id)
      .valueChanges()
      .pipe(
        map((post: IPost) => {
          return this.mapPostData(post);
        }),
        mergeMap(post => post)
      );
  }

  addComment(comment: IComment, postId: string) {
    return this.afDb
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add(comment);
  }

  getAllComments(postId: string) {
    return this.afDb
      .collection("posts")
      .doc(postId)
      .collection("comments", ref => {
        return ref.orderBy("createdOn", "asc");
      })
      .valueChanges();
  }
}
