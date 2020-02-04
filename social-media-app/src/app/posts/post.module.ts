import { NgModule } from "@angular/core";
import { MyPostsComponent } from "./my-posts/my-posts.component";
import { CreatePostComponent } from "./create-post/create-post.component";
import { AllPostsComponent } from "./all-posts/all-posts.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { CommentsComponent } from './comments/comments.component';
import { CardComponent } from './card/card.component';
import { PostRoutingModule } from './post-routing.module';


@NgModule({
  declarations: [
    MyPostsComponent,
    CreatePostComponent,
    AllPostsComponent,
    DetailsComponent,
    CommentsComponent,
    CardComponent,

  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    PostRoutingModule
  ],
  exports: []
})
export class PostModule {}
