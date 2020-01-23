import { NgModule } from "@angular/core";
import {
  MatSliderModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatInputModule
} from "@angular/material";
@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatSliderModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatDividerModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSliderModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatDividerModule
  ]
})
export class MaterialModule {}
