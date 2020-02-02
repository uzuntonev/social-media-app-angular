import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";
import { SecureInnerGuard } from "./core/guards/secure-inner.guard";

import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { MyPostsComponent } from "./posts/my-posts/my-posts.component";
import { AllPostsComponent } from "./posts/all-posts/all-posts.component";
import { CreatePostComponent } from "./posts/create-post/create-post.component";
import { ProfileComponent } from "./users/profile/profile.component";
import { AnonymousHomeComponent } from "./core/anonymous-home/anonymous-home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { DetailsComponent } from "./posts/details/details.component";
import { UsersListComponent } from './users/users-list/users-list.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: AnonymousHomeComponent },
  { path: "home", component: AnonymousHomeComponent, canActivate: [] },
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
    canActivate: [SecureInnerGuard]
  },
  { path: "posts", component: AllPostsComponent, canActivate: [AuthGuard] },
  { path: "posts/:id", component: DetailsComponent, canActivate: [AuthGuard]},
  {
    path: "create-post",
    component: CreatePostComponent,
    canActivate: [AuthGuard]
  },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "users", component: UsersListComponent, canActivate: [AuthGuard] },
  {path: "users/:id", component: ProfileComponent, canActivate: [AuthGuard]},
  { path: "my-posts", component: MyPostsComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
