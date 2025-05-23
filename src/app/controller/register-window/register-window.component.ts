import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { StandardResponse } from '../../model/standard-response';

@Component({
  selector: 'app-register-window',
  templateUrl: './register-window.component.html',
  styleUrls: ['./register-window.component.css']
})
export class RegisterWindowComponent {

  user: User;
  response: StandardResponse<null>;
  username: string = '';
  fullName: string = '';
  email: string = '';
  password: string = '';
  dateOfBirth: string = '';
  showPassword: boolean = false;

  constructor(private router: Router,
    private userService: UserService) {}

   togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    console.log('Form submitted:');
    this.user = new User({
      username: this.username,
      fullName: this.fullName,
      email: this.email,
      dateOfBirth: new Date(this.dateOfBirth),
      password: this.password
    });
    this.userService.registerUser(this.user).subscribe({
        next: (response) => {
          window.alert("Message: " + response.message + "\nStatus: " + response.status);
        },
        error: (response) => {
          const errorMsg = response.error?.message || 'Unexpected error';
          const errorStatus = response.error?.status || response.status || '500';

          window.alert("Message: " + errorMsg + "\nStatus: " + errorStatus);
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/']); 
  }

}
