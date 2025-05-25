import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from '../../service/password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string = '';
  newPassword: string = '';
  showNewPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passwordService: PasswordService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  togglePassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  onResetPassword(): void {
    this.passwordService.resetPassword(this.token, this.newPassword).subscribe({
      next: (response) => {
        window.alert("Message: " + response.message + "\nStatus: " + response.status);
        this.router.navigate(['/login']);
      },
      error: (response) => {
        const errorMsg = response.error?.message || 'Unexpected error';
        const errorStatus = response.error?.status || response.status || '500';
        window.alert("Message: " + errorMsg + "\nStatus: " + errorStatus);
      }
    });
  }
}
