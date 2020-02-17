import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";
import { Observable, Subscription } from "rxjs";
import { IUser } from "src/app/shared/interfaces/user";
import { StoreService } from "../../shared/services/store.service";
import { shareReplay } from "rxjs/operators";

@Component({
  selector: "app-users-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  options: { text: string; value: string }[] = [
    { text: "Name", value: "name" },
    { text: "Email", value: "email" },
    { text: "Title", value: "title" }
  ];
  users$: Observable<IUser[]>;
  private userListSubscription: Subscription;
  private userSearchSubscription: Subscription = new Subscription();
  constructor(
    private userService: UsersService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.userListSubscription = this.userService.getAllUsers.subscribe()
    this.users$ = this.storeService
      .select(state => state.userList)
      .pipe(shareReplay());

    // this.userListSubscription = this.userService.getAllUsers.subscribe(user => {
    //   this._userList.push(user);
    //   this.userList.push(user);
    // });
  }

  searchUser(value) {
    this.userSearchSubscription = this.storeService
      .select(state => state.userList)
      .pipe(shareReplay())
      .subscribe(userList => {
        this.users$ = this.userService.searchUser(userList, value);
      });
    // const collection = [...this._userList];
    // this.userSearchSubscription = this.userService
    // .searchUser(collection, value)
    // .subscribe(users => {
    //   this.userList = [...users];
    // });
  }

  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
    this.userSearchSubscription.unsubscribe();
  }
}
