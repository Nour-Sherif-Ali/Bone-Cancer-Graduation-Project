import { Component , inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerUserInFirebase } from './../../firebase'; // نفترض عندك ملف firebase.ts
import { Router } from '@angular/router'; // لو لسه ما ضفتهاش
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  imports : [ReactiveFormsModule, CommonModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isDoctor = false;
  selectedFile: File | null = null;
  _ToastrService=inject(ToastrService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      mobile: ['', Validators.required],
      syndicateNumber: [''], // For doctor
      relativeNumber: [''] // For relative
    });
  }

  // تحديث حالة الدكتورة وتعيين relativeNumber لـ null إذا كان دكتور
  onUserTypeToggle(event: any) {
    this.isDoctor = event.target.checked;
    if (this.isDoctor) {
      this.registerForm.patchValue({ relativeNumber: null });
    }
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
      await registerUserInFirebase(this.registerForm.value, this.selectedFile,  this._ToastrService);
      this.router.navigate(['/login']); // ✅ redirect بعد التسجيل
    } catch (error) {
      this._ToastrService.error('Registration failed. Please try again.');
    }
  }
}
