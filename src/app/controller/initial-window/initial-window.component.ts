import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-window',
  templateUrl: './initial-window.component.html',
  styleUrls: ['./initial-window.component.css'] 
})
export class InitialWindowComponent {

  constructor(private router: Router){}

  goToLoginWindow(){
     this.router.navigate(["/login"]);
  }

  goToRegisterWindow(){
    this.router.navigate(["/register"]);
  }

  goToForgotPassword(){
    this.router.navigate(["/forgotPassword"]);
  }

}
