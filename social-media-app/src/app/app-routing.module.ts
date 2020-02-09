import { Routes, RouterModule } from "@angular/router";

import { AnonymousHomeComponent } from "./core/anonymous-home/anonymous-home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SecureInnerGuard } from './shared/guards/secure-inner.guard';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: AnonymousHomeComponent },
  { path: "post", loadChildren: "./posts/post.module#PostModule" },
  { path: "user", loadChildren: "./users/user.module#UserModule" },
  { path: "**", component: NotFoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  enableTracing: false
});
