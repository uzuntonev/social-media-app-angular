import { Injectable, ElementRef } from "@angular/core";
import { fromEvent } from "rxjs";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  mergeMap
} from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { IPost } from "src/app/shared/models/post";
@Injectable({
  providedIn: "root"
})
export class CoreService {
  constructor(private afDb: AngularFirestore) {}

  userFilter(element) {
    return fromEvent(element, "keyup").pipe(
      map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
      // if character length greater then 2
      filter((res: string) => res.length > 2),
      // Time in milliseconds between key events
      debounceTime(1000),
      // If previous query is different from current
      distinctUntilChanged(),
      // Fetch all posts and filtered users by query
      mergeMap(query => {
        return this.afDb
          .collection<IPost>("posts")
          .valueChanges()
          .pipe(
            map(posts => {
              return posts.map(post => {
                if (
                  post.title
                    .toLocaleLowerCase()
                    .includes(query.toLocaleLowerCase())
                ) {
                  return post;
                }
              });
            }),
            map(list => list.filter(e => e !== undefined)),
          );
      })
    );
  }
}
