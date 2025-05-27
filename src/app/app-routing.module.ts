// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InitialWindowComponent } from './controller/initial-window/initial-window.component';
import { LoginComponent } from './controller/login/login.component';
import { RegisterWindowComponent } from './controller/register-window/register-window.component';
import { RegisterVerificationComponent } from './controller/register-verification/register-verification.component';
import { ForgotPasswordComponent } from './controller/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './controller/reset-password/reset-password.component';

// Main app container after login
import { MenuComponent } from './controller/menu/menu.component';

// Components shown within the "Manage Account" section
import { DeleteAccountComponent } from './controller/manage-account/delete-account/delete-account.component';
import { ChangePasswordComponent } from './controller/manage-account/change-password/change-password.component';
import { UpgradeUserComponent } from './controller/manage-account/upgrade-user/upgrade-user.component';
import { UpdateStatusComponent } from './controller/manage-account/update-status/update-status.component';

const routes: Routes = [
  // Public routes
  { path: '', component: InitialWindowComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterWindowComponent },
  { path: 'verifyEmail', component: RegisterVerificationComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },

  // Protected area after login
  {
    path: 'main',
    component: MenuComponent,
    children: [
      { path: 'manage-account/delete', component: DeleteAccountComponent },
      { path: 'manage-account/change-password', component: ChangePasswordComponent },
      { path: 'manage-account/upgrade', component: UpgradeUserComponent },
      { path: 'manage-account/update-status', component: UpdateStatusComponent },
      { path: '', redirectTo: 'manage-account/delete', pathMatch: 'full' } // default child route
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
