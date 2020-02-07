import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  UrlSegment,
  Route
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class CanLoadGuard implements CanLoad {
  constructor() {}
  canLoad(route: Route, segments: UrlSegment[]){
      return false
  }
}

