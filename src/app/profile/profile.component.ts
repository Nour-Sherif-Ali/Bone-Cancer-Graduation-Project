import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { UserService } from '../user.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm!: FormGroup;
  uid: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.userData$.subscribe((data: any) => {
      if (data) {
        this.uid = data.uid;
        this.profileForm = this.fb.group({
          firstName: [data.firstName || '', Validators.required],
          lastName: [data.lastName || '', Validators.required],
          email: [data.email || '', [Validators.required, Validators.email]],
          mobile: [data.mobile || '', Validators.required]
        });
      }
    });
  }

  async updateProfile() {
    if (this.profileForm.invalid) return;

    const updatedData = this.profileForm.value;
  
    try {
      const userRef = doc(db, 'users', this.uid);
      await updateDoc(userRef, {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        name: `${updatedData.firstName} ${updatedData.lastName}`,
        email: updatedData.email,
        mobile: updatedData.mobile,
        updatedAt: new Date() 
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

}
