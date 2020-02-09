import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { MaterialModule } from "../shared/material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthModule } from "../auth/auth.module";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidenavListComponent } from "./sidenav-list/sidenav-list.component";
import { CommonModule } from "@angular/common";
import { CheckPostComponent } from "./check-post/check-post.component";

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    SidenavListComponent,
    CheckPostComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AuthModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    SidenavListComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class CoreModule {}
