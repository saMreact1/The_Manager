import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isSignup: boolean = true;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() { }

  signup() {
    console.log('Email:', this.email);
    if (this.email === '') {
      this.errorMessage = 'Please enter email';
      return;
    }

    if (this.password === '') {
      this.errorMessage = 'Please enter password';
      return;
    }

    if(this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    this.auth.signup(this.email, this.password)
    
    // this.email = '';
    // this.password = '';
    // this.errorMessage = '';
  }

  toggleForm() {
    this.router.navigate(['/login']);
  }
}
