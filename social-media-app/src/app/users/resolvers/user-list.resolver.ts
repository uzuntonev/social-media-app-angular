import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { UsersService } from "../services/users.service";


@Injectable({
  providedIn: "root"
})
export class UserListResolver implements Resolve<any> {
  constructor(private userService: UsersService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    return true;
  }
}
