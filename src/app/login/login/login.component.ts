// login.component.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading: boolean = false;
  isErrorMsg: boolean = false;
  errorMessage: string = '';

  signUpform = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private router: Router, private toastr: ToastrService) {}

  async login() {
    if (this.signUpform.invalid) {
      this.errorMessage = 'يرجى إدخال جميع البيانات بشكل صحيح.';
      this.isErrorMsg = true;
      return;
    }

    const email = this.signUpform.value.email ?? '';
    const password = this.signUpform.value.password ?? '';

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // جلب بيانات المستخدم من Firestore
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userType = userData['userType'];

        // تخزين النوع والـ uid في localStorage
        localStorage.setItem('userType', userType);
        localStorage.setItem('uid', uid);

        // توجيه المستخدم بناءً على نوعه
        if (userType === 'Doctor') {
          this.router.navigate(['/doctordashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }

        this.toastr.success('Login successful', 'Welcome!');
      } else {
        this.errorMessage = 'لا يوجد بيانات لهذا المستخدم.';
        this.isErrorMsg = true;
      }
    } catch (error) {
      this.errorMessage = 'فشل تسجيل الدخول. تحقق من البيانات.';
      this.isErrorMsg = true;
      this.toastr.error('Login failed', 'Please check your credentials.');
    }
  }
}


// hasal ta8yeer hena 