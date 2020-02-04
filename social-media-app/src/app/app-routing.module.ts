
import { Routes, RouterModule } from "@angular/router";

import { AnonymousHomeComponent } from "./core/anonymous-home/anonymous-home.component";
import { NotFoundComponent } from "./not-found/not-found.component";


const routes: Routes = [
  { path: "", pathMatch: "full", component: AnonymousHomeComponent },
  { path: "home", component: AnonymousHomeComponent, canActivate: [] },
  { path: "**", component: NotFoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
