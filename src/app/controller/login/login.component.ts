import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

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
      window.alert("Message: " + response.message + "\nStatus: " + response.status);
      this.authenticationService.setUser(response.details.user);
      this.authenticationService.setTokens(response.details.refreshToken, response.details.accessToken);
      console.log(response.details.user);
      this.router.navigate(["/"]);
    },
    error: (response) => {
      window.alert(
        "Message: " + (response.error?.message || "Unknown error") +
        "\nStatus: " + (response.error?.status || response.status || "500")
      );
    }
  });
}

}
