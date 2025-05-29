import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { PasswordService } from '../../../service/password.service';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword = '';
  newPassword = '';
  showOldPassword = false;
  showNewPassword = false;
  errorMessage: string = null;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private passwordService: PasswordService,
    private authenticationService: AuthenticationService
  ) {}

  toggleOldPasswordVisibility(): void {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  onChangePassword(): void {
    let accessToken = this.authenticationService.getAccessToken();
    this.passwordService.changePassword(accessToken, this.oldPassword, this.newPassword)
      .subscribe({
        next: (response) => {
          this.toastr.success(`Message: ${response.message}`, `Status: ${response.status}`);
          setTimeout(() => {
            this.router.navigate(['/main']); 
          }, 2000);
        },
        error: (response) => { 
          const errorMsg = response.error?.message || 'Unexpected error';
          const errorStatus = response.error?.status || response.status || '500';
          this.toastr.error(`Message: ${errorMsg}`, `Status: ${errorStatus}`);
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['/main']);
  }
}