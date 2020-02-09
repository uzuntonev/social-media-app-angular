import { Injectable } from "@angular/core";
import { IUser } from "../../shared/models/user";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  mergeMap,
  map,
  debounceTime,
  distinctUntilChanged
} from "rxjs/operators";
import { IPost } from "src/app/shared/models/post";
import { fromEvent, Subject, of, Observable } from "rxjs";
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  userStore = new Subject<any[]>();
  constructor(private afDb: AngularFirestore) {}

  getUser(id) {
    return this.afDb
      .collection<IUser>("users", ref => ref.where("id", "==", id))
      .valueChanges();
  }

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

  searchUser(stream$: Observable<any>, collection: any[], params) {
    const { searchBy, searchFor } = params;

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

  _searchUser(element: FromEventTarget<any>) {
    return fromEvent(element, "keyup").pipe(
      map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
      // if character length greater then 2
      // filter((res: string) => res.length > 2),
      // Time in milliseconds between key events
      debounceTime(1000),
      // If previous query is diffent from current
      distinctUntilChanged()
      // Filtered users by query
    );
  }
}
