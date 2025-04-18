import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router , RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user.service';
import { logoutUser } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  imports : [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  _Router = inject(Router);
  _ToastrService = inject(ToastrService);
  loggedUserName: string = '';
  isLoggedIn: boolean = false;
  userData: any;
  userName: string | null = '';

  constructor(private userService: UserService) {
    this.userService.userData$.subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userService.userData$.subscribe((data) => {
          this.userName = data?.name || 'User';
        });
      } else {
        this.isLoggedIn = false;
        this.userName = 'Guest';
      }
    });
  }

  logout() {
    logoutUser(this._Router, this._ToastrService);
  }

  profile() {
    this._Router.navigate(['/profile']);
  }
}
