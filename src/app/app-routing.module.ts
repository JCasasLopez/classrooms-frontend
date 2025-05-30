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

  // Standalone manage-account routes (no menu)
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'upgrade-user', component: UpgradeUserComponent },
  { path: 'update-status', component: UpdateStatusComponent },

  {
    path: 'main',
    component: MenuComponent,
    children: [
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
