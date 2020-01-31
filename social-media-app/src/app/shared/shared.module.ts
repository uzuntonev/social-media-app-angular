import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { SidenavListComponent } from "./sidenav-list/sidenav-list.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [FooterComponent, SidenavListComponent, NavbarComponent, LoaderComponent],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [FooterComponent, SidenavListComponent, NavbarComponent, LoaderComponent]
})
export class SharedModule {}
