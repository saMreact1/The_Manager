import { Component } from '@angular/core';
import { AuthService } from '../../services/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isSignup: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if(this.email === '') {
      this.errorMessage = 'Please enter email';
      return;
    }

    if(this.password === '') {
      this.errorMessage = 'Please enter password';
      return;
    }
    this.auth.login(this.email, this.password)
    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn()
  }
}
