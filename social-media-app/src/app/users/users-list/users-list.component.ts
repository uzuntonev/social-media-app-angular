import { Component, OnInit, DoCheck } from "@angular/core";
import { UsersService } from "../users.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { IUser } from "src/app/core/models/user";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit, DoCheck {
  constructor(
    private userService: UsersService,
    private afDb: AngularFirestore
  ) {}
  users: any[] = [];
  private _users: any[] = [];

  ngOnInit() {
    this.userService.getAllUsers.subscribe((allUsers: IUser[]) => {
      allUsers.map(user => {
        this.afDb
          .collection("posts", ref => ref.where("createdById", "==", user.id))
          .valueChanges()
          .subscribe(posts => {
            this._users.push({
              ...user,
              posts
            });
          });
      });
    });
  }

  ngDoCheck() {
    this.users = this._users;
  }
}
