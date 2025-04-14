import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userData: any;

  constructor(private userService: UserService) {
    this.userService.userData$.subscribe((data) => {
      this.userData = data;
    });
  }

  // حساب السن من تاريخ الميلاد
  private calculateAge(birthdate: string): number {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  // Getters للتنسيق والعرض
  get userName() {
    return this.userData?.name || 'User';
  }

  get userEmail() {
    return this.userData?.email || 'Not Provided';
  }

  // get userProfileImage() {
  //   return this.userData?.profileImageUrl || 'https://i.pravatar.cc/100';
  // }
  
  get userBirthdate() {
    return this.userData?.birthdate ? this.calculateAge(this.userData.birthdate) + ' years' : 'Not Provided';
  }

  get userMobile() {
    return this.userData?.mobile || 'Not Provided';
  }
}
