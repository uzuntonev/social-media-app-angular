import { Injectable, NgZone } from "@angular/core";
import { IUser } from "../core/models/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _userData: any; // Save logged in user data

  constructor(
    private afDb: AngularFirestore, // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private snackbar: MatSnackBar // private ngZone: NgZone, // NgZone service to remove outside scope warning         // this.ngZone.run(() => {});
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this._userData = user;
        localStorage.setItem("user", JSON.stringify(this._userData));
        // JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem("user", null);
        // JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem("userData"));
  }

  get userData() {
    return this._userData;
  }
  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(["posts"]);
        this.afDb
          .collection("users", ref =>
            ref.where("id", "==", result.user.uid).limit(1)
          )
          .snapshotChanges()
          .pipe(map(user => user[0].payload.doc.data()))
          .subscribe(() => {
            return this.ChangeEmailVerifiedProp(result);
          });
        this.getUserData(result).subscribe(user =>
          localStorage.setItem("userData", JSON.stringify(user.payload.data()))
        );
      })
      .catch(error => {
        this.snackbar.open(error.message, "Undo", {
          duration: 3000
        });
      });
  }

  ChangeEmailVerifiedProp(value) {
    return this.afDb
      .collection("users")
      .doc(value.user.uid)
      .set({ emailVerified: value.user.emailVerified }, { merge: true });
  }

  private getUserData(value) {
    return this.afDb
      .collection("users")
      .doc(value.user.uid)
      .snapshotChanges();
  }

  // Sign up with email/password
  SignUp(email, password, repassword, name, avatar) {
    if (!password === repassword) {
      this.snackbar.open("Password do not match", "Undo", {
        duration: 3000
      });
    }
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.SendVerificationMail();
        this.SetUserData(result, name, avatar);
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
      this.router.navigate(["verify-email-address"]);
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
      })
      .catch(error => {
        this.snackbar.open(error.message, "Undo", {
          duration: 3000
        });
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
    // && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.router.navigate(["posts"]);
        this.SetUserData(result);
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
  SetUserData(result, fullName?: string, avatar?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afDb.doc(
      `users/${result.user.uid}`
    );
    
    this.getUserData(result).subscribe(user =>
      localStorage.setItem("userData", JSON.stringify(user.payload.data()))
    );

    const userData: IUser = {
      id: result.user.uid,
      email: result.user.email,
      emailVerified: result.user.emailVerified,
      fullName: fullName || result.user.displayName,
      avatar: avatar || result.user.photoURL
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("userData");
      this.router.navigate(["home"]);
    });
  }
}
