import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from './../../firebase';
import { doc, setDoc } from 'firebase/firestore';

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
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z].{6,15}$/)
    ]),
    birthdate: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0-9]{9}$/)
    ])
  });

  constructor(private router: Router) {}

  async register() {
    const { name, email, password, birthdate, gender, mobile } = this.registerForm.value;

    if (!name || !email || !password || !birthdate || !gender || !mobile) return;

    this.isLoading = true;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      const uid = userCredential.user.uid;
      await setDoc(doc(db, 'users', uid), {
        name,
        email,
        uid,
        birthdate,
        gender,
        mobile,
        createdAt: new Date()
      });

      this.isLoading = false;
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.isLoading = false;
      this.isErrorMsg = true;
      this.errorMessage = error.message;
    }
  }
}
