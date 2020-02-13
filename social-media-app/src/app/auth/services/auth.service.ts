import { Injectable } from "@angular/core";
import { IUser } from "../../shared/models/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _isAuth = false;
  private _userData: IUser = null;
  constructor(
    private afDb: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    /* Saving user data in private prop _userData when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(afUserInfo => {
      if (afUserInfo) {
        this._isAuth = true;
        localStorage.setItem("user", '');
        this.getUserData(afUserInfo).subscribe((user: IUser) => {
          this._userData = user ? user : null;
          localStorage.setItem("user", JSON.stringify(this._userData));

        });
      } else {
        localStorage.setItem("user", null);
        this._userData = null;
      }
    });
  }

  // Returns data for logged user
  get userData(): IUser {
    return this._userData;
  }

  // Returns true when user is logged
  get isLoggedIn(): boolean {
    if(localStorage.getItem("user")){
      const user = JSON.parse(localStorage.getItem("user"));
      return user != null;
    }
  }

  private changeEmailVerifiedProp(afUserInfo) {
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

  /* Sign in with email/password, 
   Check if returned info from angular fire have emailVerified prop
   with value true update property emailVerified in "users" collection */
  SignIn(value) {
    const { email, password } = value;
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(afUserInfo => {
        if (afUserInfo.user.emailVerified) {
          this.changeEmailVerifiedProp(afUserInfo);
        }
        this.router.navigate(["post", "list"]);
      })
      .catch(error => {
        this.snackbar.open(error.message, "Undo", {
          duration: 3000
        });
      });
  }

  // Sign up with email/password
  signUp(value) {
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
        this.setUserData(afUserInfo, name, avatar);
        this.sendVerificationMail();
      })
      .catch(error => {
        this.snackbar.open(error.message, "Undo", {
          duration: 3000
        });
      });
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    return this.afAuth.auth.currentUser
      .sendEmailVerification()
      .then(() => {
        this.router.navigate(["auth", "verify-email-address"]);
      })
      .catch(error => {
        this.snackbar.open(error.message, "Undo", {
          duration: 3000
        });
      });
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail) {
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

  // Sign in with Google
  GoogleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(afUserInfo => {
        this.setUserData(afUserInfo);
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
  setUserData(afUserInfo, name?: string, avatar?: string) {
    const userData: IUser = {
      id: afUserInfo.user.uid,
      email: afUserInfo.user.email,
      emailVerified: afUserInfo.user.emailVerified,
      name: name || afUserInfo.user.displayName,
      avatar: avatar || afUserInfo.user.photoURL
    };

    return this.afDb.doc(`users/${afUserInfo.user.uid}`).set(userData, {
      merge: true
    });
  }

  // Sign out
  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user")
      this._isAuth = false;
      this._userData = null;
      this.router.navigate(["/"]);
    });
  }
}
