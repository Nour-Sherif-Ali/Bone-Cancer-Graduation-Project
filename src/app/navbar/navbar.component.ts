import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthonService } from './../../app/services/authon.service';
import { UserService } from './../user.service';
import { DarkModeComponent } from "../dark-mode/dark-mode.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // @Input() isLogin: boolean = true;
  _AuthonService= inject(AuthonService);

  _Router = inject(Router);
  loggedUserName : string = '';
  email : string = '';
  userName: string | null = '';

  enableNavBar : Boolean = false;

  isLoggedIn: boolean = false;
  

  userData: any;
  constructor(private userService: UserService) {
    this.userService.userData$.subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnInit() {
    const auth = getAuth();

    // التحقق من حالة تسجيل الدخول
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true; // إذا كان فيه مستخدم مسجل دخول
        this.userService.userData$.subscribe((data) => {
          this.userName = data?.name || 'User';
        });
      } else {
        this.isLoggedIn = false; // إذا ما فيش مستخدم مسجل دخول
        this.userName = 'Guest';
      }
    });
  }



  logout() {
    const auth = getAuth();
    auth.signOut().then(() => {
      this.isLoggedIn = false; // بعد الخروج من الحساب، غير حالة الدخول
      this._Router.navigate(['/login']); // التوجيه إلى صفحة تسجيل الدخول
    });
  }

  profile(){
    this._Router.navigate(['/profile']);
  }
 
  // logOut(){   //dah signout function shelt el token we khalit el user yerga3 le saf7et el login tany
  //   localStorage.removeItem('token');
  //   this._AuthonService.isLogin.next(false);
  //   this._Router.navigate(['/login']);

  // }
}
 