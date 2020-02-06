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

  // Create new post and redirect to "/posts"
  createPost(post: IPost) {
    this.afDb
      .collection("posts")
      .doc(post.id)
      .set(post, {
        merge: true
      });
    this.router.navigate(["posts"]);
  }

  // Getter for all posts in DB in getter iteration over each post and map it. Add property imageLink
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

  // Method which map each post to add imageLink prop
  private mapPostData(post: IPost) {
    return this.afs
      .ref(`/uploads/${post.imgName}`)
      .getDownloadURL()
      .pipe(
        map(link => {
          return {
            ...post,
            imageLink: link
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

  // Pass post in params and delete it from DB and delete image from storage
  deletePost(post: IPost) {
    this.afDb
      .collection("posts")
      .doc(post.id)
      .delete();

    this.afs.ref(`/uploads/${post.imgName}`).delete();
    this.router.navigate([""]);
  }

  // Get post with Id and map it to add property imageLink
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

  // Pass in params comment and postId then add current comment in comments collection
  addComment(comment: IComment, postId: string) {
    return this.afDb
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add(comment);
  }

  // Get all comments for post with id from params
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
