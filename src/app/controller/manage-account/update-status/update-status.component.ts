import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../service/authentication.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent {

  email: string = '';
  newAccountStatus: string = 'ACTIVE';

  constructor(
      private router: Router,
      private toastr: ToastrService,
      private userService: UserService,
      private authenticationService: AuthenticationService
    ) {}

  updateStatus(): void {
    let accessToken = this.authenticationService.getAccessToken();
    this.userService.updateAccountStatus(accessToken, this.email, this.newAccountStatus)
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

  cancel(): void {
    this.router.navigate(['/main']);
  }

}
