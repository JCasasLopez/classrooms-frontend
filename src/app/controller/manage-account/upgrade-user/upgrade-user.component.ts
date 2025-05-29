import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../service/authentication.service';
import { PasswordService } from '../../../service/password.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-upgrade-user',
  templateUrl: './upgrade-user.component.html',
  styleUrl: './upgrade-user.component.css'
})
export class UpgradeUserComponent {

  email: string = '';

  constructor(
      private router: Router,
      private toastr: ToastrService,
      private authenticationService: AuthenticationService,
      private userService: UserService
    ) {}
  
  onUpgrade(): void {
      let accessToken = this.authenticationService.getAccessToken();
      this.userService.upgradeUser(accessToken, this.email)
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
