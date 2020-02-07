import {Routes, RouterModule} from "@angular/router";
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    { path: "posts", component: ListComponent, canActivate: [AuthGuard] },
    { path: "posts/:id", component: DetailComponent, canActivate: [AuthGuard]},
    {
      path: "create-post",
      component: CreateComponent,
      canActivate: [AuthGuard]
    },
]

export const PostRoutingModule = RouterModule.forChild(routes)