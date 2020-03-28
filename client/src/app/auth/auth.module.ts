import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmUserComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
