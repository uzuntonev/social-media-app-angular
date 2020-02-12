import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { UsersService } from "../services/users.service";
import { IUser } from "src/app/shared/models/user";
import { listChanges } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class UserListResolver implements Resolve<any> {
  constructor(private userService: UsersService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return true;
  }
}
