import { Injectable, NgZone } from "@angular/core";
import { IUser } from "../../shared/models/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _userData: IUser;
  constructor(
    private afDb: AngularFirestore, // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private snackbar: MatSnackBar
  ) // private ngZone: NgZone // NgZone service to remove outside scope warning         // this.ngZone.run(() => {});
  {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */

    this.afAuth.authState.subscribe(afUserInfo => {
      if (afUserInfo) {
        this.getUserData(afUserInfo).subscribe((user: IUser) => {
          this._userData = user;
          // localStorage.setItem("userData", JSON.stringify(user));
        });
      } else {
        this._userData = null;
        // localStorage.setItem("userData", null);
      }
    });
  }

  get userData(): IUser {
    return this._userData;
    // return JSON.parse(localStorage.getItem("userData"));
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    // const user = JSON.parse(localStorage.getItem("userData"));
    const user = this._userData;
    return user !== null;
    // && user.emailVerified !== false ? true : false;
  }

  /* Sign in with email/password, 
   Check if returned info from angular fire have emailVerified prop
   with value true update property emailVerified in "users" collection */
  SignIn(value) {
    const { email, password } = value;
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(afUserInfo => {
        if (afUserInfo.user.emailVerified) {
          this.ChangeEmailVerifiedProp(afUserInfo);
        }
        setTimeout(() => {
          this.router.navigate(["post", "list"]);
        }, 500);
      })
      .catch(error => {
        this.snackbar.open(error.message, "Undo", {
          duration: 3000
        });
      });
  }

  private ChangeEmailVerifiedProp(afUserInfo) {
    return this.afDb
      .collection("users")
      .doc(afUserInfo.user.uid)
      .set({ emailVerified: true }, { merge: true });
  }

  private getUserData(user) {
    return this.afDb
      .collection("users")
      .doc(user.uid)
      .snapshotChanges()
      .pipe(map(user => user.payload.data()));
  }

  // Sign up with email/password
  SignUp(value) {
    const { email, passwordsGroup, name, avatar } = value;
    if (passwordsGroup.password !== passwordsGroup.repassword) {
      this.snackbar.open("Password do not match", "Undo", {
        duration: 3000
      });
      return;
    }
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, passwordsGroup.password)
      .then(afUserInfo => {
        this.SetUserData(afUserInfo, name, avatar);
        this.SendVerificationMail();
      })
      .catch(error => {
        this.snackbar.open(error.message, "Undo", {
          duration: 3000
        });
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(["auth", "verify-email-address"]);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.snackbar.open(
          "Password reset email sent, check your inbox.",
          "Undo",
          {
            duration: 3000
          }
        );
        this.router.navigate(["auth", "sign-in"]);
      })
      .catch(error => {
        this.snackbar.open(error.message, "Undo", {
          duration: 3000
        });
      });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(afUserInfo => {
        this.SetUserData(afUserInfo);
        this.router.navigate(["post", "list"]);
      })
      .catch(error => {
        this.snackbar.open(error.message, "Undo", {
          duration: 3000
        });
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(afUserInfo, name?: string, avatar?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afDb.doc(
      `users/${afUserInfo.user.uid}`
    );

    const userData: IUser = {
      id: afUserInfo.user.uid,
      email: afUserInfo.user.email,
      emailVerified: afUserInfo.user.emailVerified,
      name: name || afUserInfo.user.displayName,
      avatar: avatar || afUserInfo.user.photoURL
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      // localStorage.removeItem("userData");
      this._userData = null;
      this.router.navigate(["home"]);
    });
  }
}
