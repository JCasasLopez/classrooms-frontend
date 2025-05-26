import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

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
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.userService.createAccount(token).subscribe({
        next: (response) => {
          this.toastr.success(`Message: ${response.message}`, `Status: ${response.status}`);
          setTimeout(() => this.router.navigate(['/']), 1000);
        },
        error: (response) => {
          const errorMsg = response.error?.message || 'Unexpected error';
          const errorStatus = response.error?.status || response.status || '500';

          this.toastr.error(`Message: ${errorMsg}`, `Status: ${errorStatus}`);
          setTimeout(() => this.router.navigate(['/register']), 1000);
        }
      });
    }
  }

}
