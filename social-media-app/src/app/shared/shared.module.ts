import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./material/material.module";
import { LoaderComponent } from "./loader/loader.component";
import { PasswordMatchDirective } from "./directives/password-match.directive";

@NgModule({
  declarations: [LoaderComponent, PasswordMatchDirective],
  imports: [MaterialModule, CommonModule, RouterModule, FlexLayoutModule],
  exports: [LoaderComponent, PasswordMatchDirective]
})
export class SharedModule {}
