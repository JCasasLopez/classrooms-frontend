import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}

  onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

  confirmDeleteAccount(): void {
  const confirmDelete = confirm('Are you sure you want to delete your account? This action cannot be undone.');
  
  if (confirmDelete) {
    let accessToken = this.authenticationService.getAccessToken();
    this.userService.deleteAccount(accessToken)
      .subscribe({
        next: (response) => {
          this.toastr.success(`Message: ${response.message}`, `Status: ${response.status}`);
          this.authenticationService.logout();
          setTimeout(() => {
            this.router.navigate(['/']); 
          }, 2000);
        },
        error: () => {
        }
      });
  }
}

toggleDropdown() {
  const dropdown = document.querySelector('.menu-dropdown');
  dropdown?.classList.toggle('active');
}
}
