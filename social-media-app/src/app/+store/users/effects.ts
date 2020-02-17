import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { UsersService } from "src/app/users/services/users.service";
import { ActionTypes, GetAllUsersSuccess } from "./actions";
import { tap, map } from 'rxjs/operators';
import { IUser } from 'src/app/shared/interfaces/user';
@Injectable({
  providedIn: "root"
})

export class UserEffects {
  constructor(private actions$: Actions, private userService: UsersService) {}

  @Effect() userList$ = this.actions$.pipe(
      ofType(ActionTypes.GetAllUsers),
      map(() => {
          debugger;
          return this.userService.getAllUsers.pipe(
              map((user: IUser) => new GetAllUsersSuccess(user))
          )
      })

  );
}
 