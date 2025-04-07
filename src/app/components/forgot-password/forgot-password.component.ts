import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  isSignup: boolean = true;

  constructor(private auth: AuthService, private router: Router) { }

  forgotPassword() {
    this.auth.forgotPassword(this.email);
    this.email = '';
  }
}
