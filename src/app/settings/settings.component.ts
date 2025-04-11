// import { Component } from '@angular/core';
// import { FormGroup, FormsModule , FormControl, Validators } from '@angular/forms';
// import { updateUserData } from './../firebase';

// @Component({
//   selector: 'app-settings',
//   imports: [FormsModule],
//   templateUrl: './settings.component.html',
//   styleUrl: './settings.component.scss'
// })
// export class SettingsComponent {
//   updatedData = {
//     name: '',
//     phone: '',
//     email: ''
//   };

//   constructor() {}

//   updateData() {
//     // استدعاء الدالة اللي بتحدث بيانات اليوزر
//     updateUserData(this.updatedData).then(() => {
//       console.log('✅ البيانات اتحدثت بنجاح');
//     }).catch(error => {
//       console.error('❌ حصل خطأ أثناء التحديث:', error);
//     });
//   }
// }


