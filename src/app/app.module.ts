import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { InitialWindowComponent } from './controller/initial-window/initial-window.component';
import { LoginComponent } from './controller/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterWindowComponent } from './controller/register-window/register-window.component';
import { RegisterVerificationComponent } from './controller/register-verification/register-verification.component';
import { ForgotPasswordComponent } from './controller/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './controller/reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MenuComponent } from './controller/menu/menu.component';
import { ChangePasswordComponent } from './controller/manage-account/change-password/change-password.component';
import { UpgradeUserComponent } from './controller/manage-account/upgrade-user/upgrade-user.component';
import { UpdateStatusComponent } from './controller/manage-account/update-status/update-status.component';
import { RouterModule } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InitialWindowComponent,
    LoginComponent,
    RegisterWindowComponent,
    RegisterVerificationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    MenuComponent,
    ChangePasswordComponent,
    UpgradeUserComponent,
    UpdateStatusComponent,
  ],

  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
    }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }