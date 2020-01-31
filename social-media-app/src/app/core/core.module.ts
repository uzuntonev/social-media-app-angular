import { NgModule } from "@angular/core";
import { AnonymousHomeComponent } from "./anonymous-home/anonymous-home.component";
import { FriendsComponent } from "./friends/friends.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { MaterialModule } from "../shared/material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AnonymousHomeComponent,
    FriendsComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [MaterialModule, FlexLayoutModule, AuthModule, SharedModule, RouterModule],
  exports: [HomeComponent]
})
export class CoreModule {}
