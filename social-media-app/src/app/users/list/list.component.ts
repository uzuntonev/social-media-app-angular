import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { UsersService } from "../services/users.service";
import { Observable, Subscription, interval, range } from "rxjs";
import { buffer, bufferCount, last, takeLast, tap } from "rxjs/operators";

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
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  users$: Observable<any>;
  private _userList: any[] = [];
  userList: any[] = [];
  private userListSubscription: Subscription;
  private userSearchSubscription: Subscription = new Subscription();
  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userListSubscription = this.userService.getAllUsers.subscribe(user => {
      this._userList = this._userList.concat(user);
      this.userList = this.userList.concat(user);
    });
    // this.users$ = this.userService.userStore;
  }

  searchUser(value) {
    this.userSearchSubscription = this.userService
      .searchUser(this._userList, value)
      .subscribe(users => {
        this.userList = [...users];
      });
    // this.users$ = this.userService.searchUser(this._allUsers, value);
  }

  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
    this.userSearchSubscription.unsubscribe();
  }
}
