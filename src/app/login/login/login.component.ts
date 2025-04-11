
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth , db } from './../../firebase';


import { doc, getDoc } from 'firebase/firestore';
import { UserService } from './../../user.service';
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
      Validators.minLength(6),
    ]),
  });


  email = '';
  password = '';
  constructor(private router: Router , private userService: UserService ) {}
  

  async login() {
    // طباعة القيم المدخلة في النموذج للتأكد
    console.log(this.signUpform.value);  // هنا هيتم طباعة البيانات المدخلة
  
    // التحقق من صحة النموذج
    if (this.signUpform.invalid) {
      this.errorMessage = 'يرجى إدخال جميع البيانات بشكل صحيح.';
      this.isErrorMsg = true;
      return;
    }
  
    const { email, password } = this.signUpform.value;
  
    // التأكد من أن الـ email و الـ password مش فارغين
    if (!email || !password) {
      this.errorMessage = 'يرجى إدخال الإيميل وكلمة السر';
      this.isErrorMsg = true;
      return;
    }
  
    try {
      // محاولة تسجيل الدخول
      await signInWithEmailAndPassword(auth, email, password);
      this.router.navigate(['/home']); // بعد النجاح، الانتقال لصفحة الـ Home
    } catch (error) {
      console.error('Error during login:', error);  // طباعة الأخطاء في الـ console
      this.errorMessage = 'فشل تسجيل الدخول. تحقق من البيانات.';
      this.isErrorMsg = true;
    }
  }
  

}
