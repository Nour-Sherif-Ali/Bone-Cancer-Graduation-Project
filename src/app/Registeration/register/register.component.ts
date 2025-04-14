// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth, db } from './../../firebase';
// import { doc, setDoc } from 'firebase/firestore';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss'],
// })
// export class RegisterComponent {
//   isLoading: boolean = false;
//   isErrorMsg: boolean = false;
//   errorMessage: string = '';

//   registerForm = new FormGroup({
//     name: new FormControl(null, [Validators.required]),
//     email: new FormControl(null, [Validators.required, Validators.email]),
//     password: new FormControl(null, [
//       Validators.required,
//       Validators.pattern(/^[A-Z].{6,15}$/)
//     ]),
//     birthdate: new FormControl(null, [Validators.required]),
//     gender: new FormControl(null, [Validators.required]),
//     mobile: new FormControl(null, [
//       Validators.required,
//       Validators.pattern(/^01[0-9]{9}$/)
//     ])
//   });

//   constructor(private router: Router) {}

//   async register() {
//     const { name, email, password, birthdate, gender, mobile } = this.registerForm.value;

//     if (!name || !email || !password || !birthdate || !gender || !mobile) return;

//     this.isLoading = true;
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(userCredential.user, { displayName: name });

//       const uid = userCredential.user.uid;
//       await setDoc(doc(db, 'users', uid), {
//         name,
//         email,
//         uid,
//         birthdate,
//         gender,
//         mobile,
//         createdAt: new Date()
//       });

//       this.isLoading = false;
//       this.router.navigate(['/login']);
//     } catch (error: any) {
//       this.isLoading = false;
//       this.isErrorMsg = true;
//       this.errorMessage = error.message;
//     }
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerUserInFirebase } from './../../firebase'; // نفترض عندك ملف firebase.ts
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports : [ReactiveFormsModule, CommonModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isDoctor = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      mobile: ['', Validators.required],
      syndicateNumber: [''],
      relativeNumber: ['']
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
      alert('Please fill all fields correctly.');
      return;
    }

    const { password, repassword } = this.registerForm.value;
    if (password !== repassword) {
      alert('Passwords do not match.');
      return;
    }

    // Send to Firebase
    await registerUserInFirebase(this.registerForm.value);
  }
}
