import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  DoCheck
} from "@angular/core";
import { UsersService } from "../services/users.service";
import { fromEvent } from "rxjs";
import {
  distinctUntilChanged,
  debounceTime,
  filter,
  map,
  tap
} from "rxjs/operators";
import { IUser } from "src/app/shared/models/user";

@Component({
  selector: "app-users-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  users: any[] = [];
  constructor(private userService: UsersService) {}

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, "keyup")
      .pipe(
        map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
        // if character length greater then 2
        filter((res: string) => res.length > 2),
        // Time in milliseconds between key events
        debounceTime(1000),
        // If previous query is diffent from current
        distinctUntilChanged()
        // subscription for response
      )
      .subscribe(query => {
        if (query != "") {
          this.users = [];
          this.userService.getAllUsers
            .pipe(filter((user: IUser) => user.name.includes(query)))
            .subscribe((user: IUser) => {
              this.users.push(user);
            });
        }
      });
    this.userService.getAllUsers.subscribe(user => {
      this.users.push(user);
    });
  }
}
