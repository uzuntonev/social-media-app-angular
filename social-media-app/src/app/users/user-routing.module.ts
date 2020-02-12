import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { ListComponent } from "./list/list.component";
import { AuthGuard } from "../shared/guards/auth.guard";
import { UserListResolver } from "./resolvers/user-list.resolver";
const routes: Routes = [
  { path: "", redirectTo: "list" },
  {
    path: "list",
    resolve: {
      userList: UserListResolver
    },
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  { path: ":id", component: ProfileComponent, canActivate: [AuthGuard] }
];

export const UserRoutingModule = RouterModule.forChild(routes);
