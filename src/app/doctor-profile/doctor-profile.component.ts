import { Component, OnInit } from '@angular/core';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage, auth } from './../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-profile',
  imports: [FormsModule],
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
  userData: any = {};
  selectedFile: File | null = null;
  loading = false;

  constructor(private toastr: ToastrService) {}

  async ngOnInit() {
    const uid = localStorage.getItem('uid');
    if (uid) {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.userData = docSnap.data();
      }
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async updateDoctorData() {
    this.loading = true;
    const uid = localStorage.getItem('uid');
    if (!uid) return;

    const docRef = doc(db, 'users', uid);

    try {
      let imageURL = this.userData.profileImage;

      if (this.selectedFile) {
        const fileRef = ref(storage, `profileImages/${uid}/${this.selectedFile.name}`);
        await uploadBytes(fileRef, this.selectedFile);
        imageURL = await getDownloadURL(fileRef);
      }

      await updateDoc(docRef, {     // Update the document with the new data in the firebase
        name: this.userData.name,
        mobile: this.userData.mobile,
        email: this.userData.email,
        profileImage: imageURL,
        updatedAt: new Date() 
      });
      

      this.toastr.success('Profile updated successfully!');
    } catch (error) {
      this.toastr.error('Error updating profile!');
      console.error(error);
    }

    this.loading = false;
  }
}
