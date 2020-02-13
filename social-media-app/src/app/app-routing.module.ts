import { Routes, RouterModule } from "@angular/router";

import { CheckPostComponent } from "./core/check-post/check-post.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SecureInnerGuard } from "./shared/guards/secure-inner.guard";
import { HomeComponent } from "./core/home/home.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent,},
  { path: "check-post", component: CheckPostComponent, canActivate: [SecureInnerGuard] },
  { path: "post", loadChildren: "./posts/post.module#PostModule" },
  { path: "user", loadChildren: "./users/user.module#UserModule" },
  { path: "**", component: NotFoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  enableTracing: false
});
