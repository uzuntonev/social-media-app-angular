import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./material/material.module";
import { LoaderComponent } from "./loader/loader.component";
import { PasswordMatchDirective } from "./directives/password-match.directive";
import { SubstringPipe } from './pipes/substring.pipe';

@NgModule({
  declarations: [LoaderComponent, PasswordMatchDirective, SubstringPipe],
  imports: [MaterialModule, CommonModule, RouterModule, FlexLayoutModule],
  exports: [LoaderComponent, PasswordMatchDirective, SubstringPipe]
})
export class SharedModule {}
