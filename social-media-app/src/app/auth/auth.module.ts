import { NgModule } from "@angular/core";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../shared/material/material.module";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule, FlexLayoutModule, RouterModule],
  exports: [SignInComponent]
})
export class AuthModule {}
