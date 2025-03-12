import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthonService } from './../../services/authon.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isErrorMsg: boolean = false;
  isLoading: boolean = false;
  _AuthonService = inject(AuthonService);
  _Router = inject(Router);

  // FormGroup with validators
  registerForm = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(/^[A-Za-z\s]+$/) // Only letters and spaces allowed
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z].{6,15}$/) // Starts with uppercase, 6-15 characters
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z].{6,15}$/) // Same as password validation
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/) // Egyptian phone number (starts with 010, 011, 012, or 015)
      ]),
    },
    this.confirmPassword
  );

  // Custom validator for password match
  confirmPassword(f: any) {
    if (f.get('password')?.value === f.get('rePassword')?.value) {
      return null;
    } else {
      return { didntMatch: true };
    }
  }

  // Form submission handler
  getData(form: any) {
    if (form.valid) {
      this.isLoading = true;
      this._AuthonService.signup(form.value).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.isErrorMsg = false;
          this.isLoading = false;
          this._Router.navigate(['/login']);
        },
        error: (err: any) => {
          console.log(err);
          this.isErrorMsg = true;
          this.isLoading = false;
        },
        complete: () => {},
      });
    } else {
      console.log('Form Invalid');
      Object.keys(this.registerForm.controls).forEach(key => {
        const controlErrors = this.registerForm.get(key)?.errors;
        if (controlErrors != null) {
          console.log('Key control: ' + key + ', errors: ', controlErrors);
        }
      });
    }
  }
}