import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";
import { SecureInnerGuard } from "./core/guards/secure-inner.guard";

import { HomeComponent } from "./components/home/home.component";
import { SignInComponent } from "./components/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { VerifyEmailComponent } from "./components/auth/verify-email/verify-email.component";
import { ForgotPasswordComponent } from "./components/auth/forgot-password/forgot-password.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "home", component: HomeComponent, },
  { path: "sign-in", component: SignInComponent, canActivate: [SecureInnerGuard] },
  { path: "register-user", component: SignUpComponent, canActivate: [SecureInnerGuard] },
  { path: "forgot-password", component: ForgotPasswordComponent, canActivate: [SecureInnerGuard] },
  { path: "verify-email-address", component: VerifyEmailComponent, canActivate: [SecureInnerGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
