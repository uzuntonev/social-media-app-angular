import { NgModule } from "@angular/core";
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { DetailComponent } from "./detail/detail.component";
import { CommentsComponent } from "./comments/comments.component";
import { CardComponent } from "./card/card.component";
import { PostRoutingModule } from "./post-routing.module";
import { SubstringPipe } from "../shared/pipes/substring.pipe";
import { LikeDislikePipe } from '../shared/pipes/like-dislike.pipe';

@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    DetailComponent,
    CommentsComponent,
    CardComponent,
    SubstringPipe,
    LikeDislikePipe,
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
