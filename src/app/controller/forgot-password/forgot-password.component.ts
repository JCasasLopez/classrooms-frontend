import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from '../../service/password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  email: string = '';

  constructor(
      private router: Router,
      private passwordService: PasswordService,
      private toastr: ToastrService) {}

  onSubmit(): void {
      this.passwordService.forgotPassword(this.email).subscribe({
          next: (response) => {
            this.toastr.success(`Message: ${response.message}`, `Status: ${response.status}`);
          },
          error: (response) => {
            const errorMsg = response.error?.message || 'Unexpected error';
            const errorStatus = response.error?.status || response.status || '500';
            this.toastr.error(`Message: ${errorMsg}`, `Status: ${errorStatus}`);
          }
        });
    }

  cancel(): void {
    this.router.navigate(['/']); 
  }

}
