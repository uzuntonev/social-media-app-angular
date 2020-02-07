import { Injectable } from "@angular/core";
import { IUser } from "../../shared/models/user";
import { AngularFirestore } from "@angular/fire/firestore";
import { mergeMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private afDb: AngularFirestore) {}

  getUser(id) {
    return this.afDb
      .collection("users", ref => ref.where("id", "==", id))
      .valueChanges();
  }

  get getAllUsers() {
    return this.afDb
      .collection("users")
      .valueChanges()
      .pipe(
        mergeMap(x => x),
        mergeMap((user: IUser) => {
          return this.afDb
            .collection("posts", ref => ref.where("createdById", "==", user.id))
            .valueChanges()
            .pipe(
              map(posts => {
                return {
                  ...user,
                  posts
                };
              })
            );
        })
      );
  }
  
}
