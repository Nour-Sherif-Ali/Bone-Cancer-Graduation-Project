import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { registerUserInFirebase } from './../../firebase';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  userRole: 'Doctor' | 'Patient' = 'Patient';
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
      mobile: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      syndicateNumber: [''],
      relativeNumber: [''],
    });
  }

  selectRole(role: 'Doctor' | 'Patient') {
    this.userRole = role;
    if (role === 'Doctor') {
      this.registerForm.get('relativeNumber')?.reset();
    } else {
      this.registerForm.get('syndicateNumber')?.reset();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
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
      await registerUserInFirebase({
        ...this.registerForm.value,
        role: this.userRole
      },  this._ToastrService);

      this.router.navigate(['/login']);
    } catch (err) {
      this._ToastrService.error('Registration failed. Please try again.');
    }
  }
}