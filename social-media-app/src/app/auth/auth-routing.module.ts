import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SecureInnerGuard } from "../shared/guards/secure-inner.guard";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
const routes: Routes = [
  {
    path: "sign-in",
    component: SignInComponent,
    canActivate: [SecureInnerGuard]
  },
  {
    path: "register-user",
    component: SignUpComponent,
    canActivate: [SecureInnerGuard]
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    canActivate: [SecureInnerGuard]
  },
  {
    path: "verify-email-address",
    component: VerifyEmailComponent,
    canActivate: []
  }
];
export const AuthRoutingModule = RouterModule.forChild(routes);
