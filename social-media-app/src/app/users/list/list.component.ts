import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { UsersService } from "../services/users.service";
import { Observable, Subscription, of } from "rxjs";
import { filter, tap, mergeMapTo, mergeMap, map } from "rxjs/operators";
import { IPost } from "src/app/shared/models/post";

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
  private _allUsers: any[] = [];
  private userListSubscription: Subscription;
  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userListSubscription = this.userService.getAllUsers.subscribe(user => {
      this._allUsers = this._allUsers.concat(user);
    });
    this.users$ = this.userService.userStore;
  }

  searchUser(value) {
    this.users$ = this.userService.searchUser(
      this.users$,
      this._allUsers,
      value
    );
  }

  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
  }
}
