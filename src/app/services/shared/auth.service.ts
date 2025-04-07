import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // Login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/taskList']);

        if(res.user?.emailVerified === true) {
          this.router.navigate(['/taskList']);
        } else {
          this.router.navigate(['/verify-email']);
        }
        
      }, err => {
        alert(err.message);
        this.router.navigate(['/login'])
      })
  }

  // Sign Up method
  signup(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        alert('Registration Successful');
        this.router.navigate(['/login']);
        this.sendEmailVerification(res.user);
      }, err => {
        alert(err.message);
        this.router.navigate(['/signup'])
      })
  }

  // Sign Out method
  logout() {
    this.fireauth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
      }, err => {
        alert(err.message)
      })
  }

  // Forgot Password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent, check your inbox.')
        this.router.navigate(['/verify-email'])
      }, err => {
        alert(err.message)
      })
  }

  // Verify Email
  sendEmailVerification(user: any) {
    user.sendEmailVerification()
      .then((res: any) => {
        this.router.navigate(['/verify-email']);
      }, (err: any) => {
        alert('Something went wrong, please try again.')
      })
  }

  // Sign in with Google
  googleSignIn() {
    this.fireauth.signInWithPopup(new GoogleAuthProvider)
      .then(res => {
        this.router.navigate(['/taskList']);
        localStorage.setItem('token', JSON.stringify(res.user?.uid))
      }), err => {
        alert(err.message)
      }
  }
}