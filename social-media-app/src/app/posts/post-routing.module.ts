import {Routes, RouterModule} from "@angular/router";
import { AllPostsComponent } from './all-posts/all-posts.component';
import { DetailsComponent } from './details/details.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
    { path: "posts", component: AllPostsComponent, canActivate: [AuthGuard] },
    { path: "posts/:id", component: DetailsComponent, canActivate: [AuthGuard]},
    {
      path: "create-post",
      component: CreatePostComponent,
      canActivate: [AuthGuard]
    },
]

export const PostRoutingModule = RouterModule.forChild(routes)