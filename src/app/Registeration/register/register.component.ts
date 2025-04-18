import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerUserInFirebase, signUpWithGoogle } from './../../firebase';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isDoctor = false;
  selectedFile: File | null = null;
  _ToastrService = inject(ToastrService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      mobile: ['', Validators.required],
      medicalCard: [''],
      relativeNumber: ['']
    });
  }

  onUserTypeToggle(event: any) {
    this.isDoctor = event.target.checked;
    if (this.isDoctor) {
      this.registerForm.patchValue({ relativeNumber: null });
    } else {
      this.registerForm.patchValue({ medicalCard: null }); 
    }
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this._ToastrService.error('Please fill all fields correctly.');
      return;
    }

    const { password, repassword } = this.registerForm.value;
    if (password !== repassword) {
      this._ToastrService.error('Passwords do not match.');
      return;
    }

    try {
      await registerUserInFirebase(this.registerForm.value, this.selectedFile, this._ToastrService);
      this.router.navigate(['/login']);
    } catch (error) {
      this._ToastrService.error('Registration failed. Please try again.');
    }
  }

  async signUpWithGoogleHandler() {
    await signUpWithGoogle(this._ToastrService, this.isDoctor, this.router);
  }
}