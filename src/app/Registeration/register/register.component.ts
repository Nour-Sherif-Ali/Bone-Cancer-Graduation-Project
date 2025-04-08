
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './../../firebase';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLoading: boolean = false;
  isErrorMsg: boolean = false;
  errorMessage: string = '';

  registerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern(/^[A-Za-z\s]+$/)
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z].{6,15}$/)
    ]),
  });

  constructor(private router: Router) {}

  register() {
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    if (!name || !email || !password) return;

    this.isLoading = true;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        return updateProfile(userCredential.user, { displayName: name });
      })
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.isLoading = false;
        this.isErrorMsg = true;
        this.errorMessage = error.message;
      });
  }
}
