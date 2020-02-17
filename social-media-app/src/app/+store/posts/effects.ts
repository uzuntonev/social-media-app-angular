// import { Injectable } from "@angular/core";
// import { Actions, Effect, ofType } from "@ngrx/effects";
// import { ActionTypes, SignIn, SignInSuccess, SignInFailed } from "./actions";
// import { switchMap, map } from "rxjs/operators";
// import { AuthService } from "src/app/auth/services/auth.service";
// @Injectable({
//   providedIn: "root"
// })
// export class AuthEffects {
//   constructor(private actions$: Actions, private authService: AuthService) {}

//   @Effect() login$ = this.actions$.pipe(
//     ofType<SignIn>(ActionTypes.SignIn),
//     map(action => action.payload),
//     switchMap(data => {
//       return this.authService
//         .signIn(data)
//         .then(data => {
//         //   new SignInSuccess((email , name});
//         })
//         .catch(err => new SignInFailed(err));
//     }),
//     map(() => {})
//   );
// }
