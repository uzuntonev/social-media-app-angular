import { Injectable } from "@angular/core";
import { IUser } from "../../shared/models/user";
import { AngularFirestore } from "@angular/fire/firestore";
import { mergeMap, map, tap } from "rxjs/operators";
import { IPost } from "src/app/shared/models/post";
import { Subject, of, Observable } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  userStore = new Subject<any>();
  constructor(
    private afDb: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  // Get single user bt id
  getUser(id) {
    return this.afDb
      .collection<IUser>("users", ref => ref.where("id", "==", id))
      .valueChanges();
  }

  // Get all users
  get getAllUsers() {
    let userList: any[] = [];
    return this.afDb
      .collection<IUser>("users")
      .valueChanges()
      .pipe(
        mergeMap((userList: IUser[]) => userList),
        mergeMap(user => {
          return this.afDb
            .collection<IPost>("posts", ref =>
              ref.where("createdById", "==", user.id)
            )
            .valueChanges()
            .pipe(
              map((posts: IPost[]) => {
                userList = userList.concat({ ...user, posts });
                this.userStore.next(userList);
                return {
                  ...user,
                  posts
                };
              })
            );
        })
      );
  }

  // In params pass collection and criteria for search. Search for user in passed collection by criteria and return stream with found users
  searchUser(collection: any[], params) {
    const { searchBy, searchFor } = params;
    let stream$: Observable<any>;
    if (searchBy === "title") {
      stream$ = of(
        [...collection].filter(user => {
          const isFound = user.posts.filter(post => {
            return post.title
              .toLocaleLowerCase()
              .includes(searchFor.toLocaleLowerCase());
          });
          if (!!isFound.length) {
            return user;
          }
        })
      );
    } else {
      stream$ = of(
        [...collection].filter(user => {
          return user[searchBy]
            .toLocaleLowerCase()
            .includes(searchFor.toLocaleLowerCase());
        })
      );
    }
    return stream$;
  }

  deleteUser(userId) {
    this.afAuth.auth.currentUser.delete().then(() => {
      this.authService.signOut();
      this.afDb
        .collection("users")
        .doc(userId)
        .delete();
    });
  }
}
