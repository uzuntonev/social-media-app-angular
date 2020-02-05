import { Component, OnInit } from "@angular/core";
import { UsersService } from "../users.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  constructor(private userService: UsersService) {}
  users: any[] = [];

  ngOnInit() {
    this.userService.getAllUsers.subscribe(user => this.users.push(user));
  }
}
