import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { AuthGuard } from "../core/guards/auth.guard";
const routes: Routes = [
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "users", component: UsersListComponent, canActivate: [AuthGuard] },
  { path: "users/:id", component: ProfileComponent, canActivate: [AuthGuard] }
];

export const UserRoutingModule = RouterModule.forChild(routes);
