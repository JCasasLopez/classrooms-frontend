import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { Observable } from 'rxjs';
import { StandardResponse } from '../../../model/standard-response';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthHttpService } from '../../../service/auth-http.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {

  callRefreshToken: boolean = true;

  constructor(private authenticationService: AuthenticationService,
              private authHttpService: AuthHttpService,
              private toastr: ToastrService,
              private router: Router,
  ){}

  deleteAccount(): void {
  this.authHttpService.delete<null>('http://localhost:8000/user/deleteAccount')
    .subscribe({
      // Success response: deletes account, logs out and returns to main page
      next: (response) => {
        this.toastr.success(`Message: ${response.message}`, `Status: ${response.status}`);
        this.authenticationService.logout();
        this.router.navigate(['/']);
      },
      error: () => {
        // Error already handled inside AuthHttpService (toastr, logout, redirection if needed)
        // This block is optional unless you want to log it or trigger other UI actions
      }
    });
  }

}
