import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { ListComponent } from "./list/list.component";
import { AuthGuard } from "../shared/guards/auth.guard";
import { UserResolver } from "./resolvers/user.resolver";
const routes: Routes = [
  { path: "", redirectTo: "list" },
  {
    path: "list",
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  { path: ":id",
    //   resolve: {
    //   user: UserResolver
    // },
     component: ProfileComponent}
];

export const UserRoutingModule = RouterModule.forChild(routes);
