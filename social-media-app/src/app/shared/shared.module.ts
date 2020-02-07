import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./material/material.module";
import { LoaderComponent } from "./loader/loader.component";


@NgModule({
  declarations: [LoaderComponent],
  imports: [MaterialModule, CommonModule, RouterModule, FlexLayoutModule],
  exports: [LoaderComponent]
})
export class SharedModule {}
