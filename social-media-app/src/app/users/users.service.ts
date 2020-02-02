import { Injectable } from "@angular/core";
import { IUser } from "../core/models/user";
import { AuthService } from "../auth/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private afDb: AngularFirestore
  ) {}

  getUser(id) {
   return this.afDb.collection("users", ref => ref.where("id", "==", id))
      .valueChanges()
  }


  get getAllUsers() {
    return this.afDb
      .collection("users")
      .valueChanges()
  }

  // addFriend(user) {
  //   this.afDb
  //     .collection("users")
  //     .doc(this.currentUser.id)
  //     .collection("friends")
  //     .doc(user.id)
  //     .set(user, {
  //       merge: true
  //     });
  // }

  // isInFriendList(user) {
  //   return this.afDb
  //     .collection("users")
  //     .doc(this.currentUser.id)
  //     .collection("friends")
  //     .doc(user.id)
  //     .snapshotChanges();
  // }

  // deleteFriend(user) {
  //   this.afDb
  //     .collection("user")
  //     .doc(this.currentUser.id)
  //     .collection("friends")
  //     .doc(user.id)
  //     .delete();
  //   this.router.navigate(["home"]);
  // }
}
