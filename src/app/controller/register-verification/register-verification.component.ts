import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register-verification',
  templateUrl: './register-verification.component.html',
  styleUrls: ['./register-verification.component.css']
})
export class RegisterVerificationComponent implements OnInit {

  statusMessage: string = 'Verifying...';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
  const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.userService.createAccount(token).subscribe({
        next: (response) => {
          window.alert("Message: " + response.message + "\nStatus: " + response.status);
          setTimeout(() => this.router.navigate(['/']), 1000);
        },
        error: (response) => {
          const errorMsg = response.error?.message || 'Unexpected error';
          const errorStatus = response.error?.status || response.status || '500';

          window.alert("Message: " + errorMsg + "\nStatus: " + errorStatus);
          setTimeout(() => this.router.navigate(['/register']), 1000);
        }
      });
    }
  }

}
