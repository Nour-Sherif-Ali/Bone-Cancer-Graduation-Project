
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../firebase';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading: boolean = false;
  isErrorMsg: boolean = false;
  errorMessage: string = '';

  signUpform = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z].{6,15}$/)
    ]),
  });

  constructor(private router: Router) {}

  login() {
    const email = this.signUpform.value.email;
    const password = this.signUpform.value.password;

    if (!email || !password) return;

    this.isLoading = true;
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.isLoading = false;
        this.isErrorMsg = true;
        this.errorMessage = error.message;
      });
  }
}
