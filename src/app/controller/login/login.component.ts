import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authenticationService: AuthenticationService, 
    private router: Router,
    private toastr: ToastrService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

  login(username: string, password: string): void {
  this.authenticationService.login(username, password).subscribe({
    next: (response) => {
      this.toastr.success(`Message: ${response.message}`, `Status: ${response.status}`);
      this.authenticationService.setUser(response.details.user);
      this.authenticationService.setTokens(response.details.refreshToken, response.details.accessToken);
      console.log(response.details.user);
      console.log(this.authenticationService.getUser());
      this.router.navigate(["/main"]);
    },
    error: (response) => {
      const errorMsg = response.error?.message || 'Unexpected error';
      const errorStatus = response.error?.status || response.status || 500;
      this.toastr.error(`Message: ${errorMsg}`, `Status: ${errorStatus}`);
    }
  });
}

}
