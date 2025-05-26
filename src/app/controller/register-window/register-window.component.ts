import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { StandardResponse } from '../../model/standard-response';
import { ToastrService } from 'ngx-toastr';

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
    private userService: UserService,
    private toastr: ToastrService) {}

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
