import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "./shared/material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FirebaseModule } from "./shared/firebase/firebase.module";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";

import { PostsModule } from "./posts/posts.module";
import { CoreModule } from "./core/core.module";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    MaterialModule,
    FirebaseModule,
    SharedModule,
    AuthModule,
    PostsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
