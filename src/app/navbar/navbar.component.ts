import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthonService } from './../../app/services/authon.service';
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

  enableNavBar : Boolean = false;
  ngOnInit():void {
    this._AuthonService.isLogin.subscribe(
      (val) => {this.enableNavBar = val;
        console.log('navbar subscribe');  // kol ma 2a3mel login el subscribe ye-run automatic

      }
    );
    this._AuthonService.userName.subscribe((value) =>
    {
      this.loggedUserName=value;
      this.email = value;
    }
    
    )
   
  }
  profile(){
    this._Router.navigate(['/profile']);
  }
 
  logOut(){   //dah signout function shelt el token we khalit el user yerga3 le saf7et el login tany
    localStorage.removeItem('token');
    this._AuthonService.isLogin.next(false);
    this._Router.navigate(['/login']);

  }
}
 