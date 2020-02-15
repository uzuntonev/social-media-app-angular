import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { IPost } from "../../shared/models/post";
import { map } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import { IComment } from "../../shared/models/comment";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(
    private afDb: AngularFirestore,
    private router: Router,
    private afs: AngularFireStorage
  ) {}

  // Create new post and redirect to "/post/list"
  createPost(post: IPost) {
    let subscription: Subscription;
    this.afDb
      .collection<IPost>("posts")
      .doc(post.id)
      .set(post, {
        merge: true
      })
      .then(() => {
        subscription = this.mapPostData(post).subscribe(
          updatedPost => {
            this.afDb
              .collection<IPost>("posts")
              .doc(post.id)
              .update({
                imageLink: updatedPost.imageLink
              });
          },
          err => console.log(err),
          () => subscription.unsubscribe()
        );
        this.router.navigate(["post", "list"]);
      })
      .catch(err => console.error(err));
  }

  // Getter for all posts in DB in getter iteration over each post and map it. Add property imageLink
  getAllPost() {
    return this.afDb
      .collection<IPost>("posts", ref => {
        return ref.orderBy("createdOn", "desc");
      })
      .valueChanges();
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

  // Update likes and dislikes prop every time when button is clicked
  updateLikeDislike(postId: string, prop: string, value: string) {
    return this.afDb
      .collection<IPost>("posts", ref => {
        return ref.where("createdById", "==", postId);
      })
      .doc(postId)
      .update({ [prop]: +value + 1 });
  }

  // Pass post in params and delete it from DB and delete image from storage
  deletePost(post: IPost) {
    this.afDb
      .collection<IPost>("posts")
      .doc(post.id)
      .delete()
      .catch(err => console.error(err));

    this.afs
      .ref(`/uploads/${post.imgName}`)
      .delete()
      .subscribe(
        () => {
          this.router.navigate(["post", "list"]);
        },
        err => console.error(err)
      );
  }

  // Get post with Id and map it to add property imageLink
  getPost(postId: string) {
    return this.afDb
      .collection<IPost>("posts")
      .doc(postId)
      .valueChanges();
  }

  // Pass in params comment and postId then add current comment in comments collection
  addComment(comment: IComment, postId: string) {
    return this.afDb
      .collection<IPost>("posts")
      .doc(postId)
      .collection<IComment>("comments")
      .add(comment);
  }

  // Get all comments for post with id from params
  getAllComments(postId: string) {
    return this.afDb
      .collection<IPost>("posts")
      .doc(postId)
      .collection<IComment>("comments", ref => {
        return ref.orderBy("createdOn", "asc");
      })
      .valueChanges();
  }
}
