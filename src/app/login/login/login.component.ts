import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthonService } from './../../services/authon.service';
import { jwtDecode } from 'jwt-decode';  // matensash te3melha download men el cli npm i jwt-decode
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoading: boolean = false;
  isErrorMsg: boolean = false;

  _AuthonService = inject(AuthonService);
  _router = inject(Router);
  
  signUpform = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z].{6,15}$/)
    ]),
  });

  login(form: any) {
    console.log(form);
    if (form.valid) {
      this.isLoading = true;
      this._AuthonService.signIn(form.value).subscribe({
        next: (resp) => {
          console.log(resp);
          this.isErrorMsg = false;
          this.isLoading = false;
          localStorage.setItem('token', resp.token);
          let decodedToken: any = jwtDecode(resp.token);
          this._AuthonService.userName.next(decodedToken.name);
          console.log(decodedToken);
          this._AuthonService.isLogin.next(true);
          this._router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.isErrorMsg = false;
        },
        complete: () => {},
      });
    } else {
      console.log('form Invalid');
    }
  };
  
  getData(form: any) {
    if (form.valid) {

      this.isLoading = true;
      this._AuthonService.signIn(form.value).subscribe({
        next: (resp) => {
          console.log(resp);
          this.isErrorMsg = false;
          
          localStorage.setItem('token',resp.token);
          let decodedToken: any = jwtDecode(resp.token) ; //2e3mel7a import {jwtDecode} from 'jwt-decode'; 
          this._AuthonService.userName.next(decodedToken.name);
          console.log(decodedToken);

          this._AuthonService.isLogin.next(true); // mayenfa3sh ne3melo '=' hayegblk error fa benesta5dem .next() we benekteb gowa el parameter TRUE, we next haye3mel ta8ayor fe observable
          
          
          this._router.navigate(['/home'])
        },
        error: (err) => {
          console.log(err);
          this.isErrorMsg = true;
          this.isLoading = false;
        },
        complete: () => {},
      });
    } else {
      console.log('form Invalid');
    }
  }
}