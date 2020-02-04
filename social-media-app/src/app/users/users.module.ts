import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile/profile.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UsersListComponent, ProfileComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, SharedModule,RouterModule, UserRoutingModule]
})
export class UsersModule {}
