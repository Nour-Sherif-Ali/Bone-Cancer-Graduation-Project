import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './Registeration/register/register.component';
import { LoginComponent } from "./login/login/login.component";
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { HomeComponent } from "./home/home.component";
import { TestComponent } from "./test/test.component";
import { DarkModeComponent } from "./dark-mode/dark-mode.component";
import { DashboardComponent } from "./dashboard/dashboard.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BoneCancerInterface';
}
