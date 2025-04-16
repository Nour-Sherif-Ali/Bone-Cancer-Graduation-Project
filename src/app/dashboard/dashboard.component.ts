import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData: any;
  isOnline = false;
  isLoading = true;

  totalPosts = 0;
  totalReports = 0;
  accountCreationDate = 'N/A';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Simulate loading delay
    setTimeout(() => {
      this.userService.userData$.subscribe((data) => {
        this.userData = data;

        // Set dummy data or fetch from real APIs if available
        this.totalPosts = 18; // Example
        this.totalReports = 3;
        this.accountCreationDate = this.formatDate(data.createdAt || '2023-06-01');

        // Simulate user is online
        this.isOnline = true;

        this.isLoading = false;
      });
    }, 1500);
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

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Getters
  get userName() {
    return this.userData?.name || 'User';
  }

  get userEmail() {
    return this.userData?.email || 'Not Provided';
  }

  get userBirthdate() {
    return this.userData?.birthdate ? this.calculateAge(this.userData.birthdate) + ' years' : 'Not Provided';
  }

  get userMobile() {
    return this.userData?.mobile || 'Not Provided';
  }

  get userProfileImage() {
    return this.userData?.profileImageUrl || 'https://i.pravatar.cc/100';
  }

  get userRelativePhone() {
    return this.userData?.relativeNumber || 'Not Provided';
  }
}
