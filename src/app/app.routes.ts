import { Routes, RouterModule  } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './Registeration/register/register.component';
import { notLoginGuard } from './guard/auth/notlogin.guard';
import { HomeComponent } from './home/home.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { NotfoundComponent } from './../app/notfound/notfound.component';
import { StartDiagnosisComponent } from './start-diagnosis/start-diagnosis.component';
import { DiagnosisResultComponent } from './diagnosis-result/diagnosis-result.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { TreatementSuggestionComponent } from './treatement-suggestion/treatement-suggestion.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
// import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    {path:'',redirectTo:'/login', pathMatch:'full'},
    {path:'home' , component: HomeComponent,title:'Home',canActivate:[notLoginGuard] },
    {path:'news' , component: NewsFeedComponent,title:'Health Care',canActivate:[notLoginGuard] },
    {path:'about' , component: AboutComponent,title:'About System',canActivate:[notLoginGuard] },
    {path:'diagnosis' , component: StartDiagnosisComponent,title:'Start Diagnosis',canActivate:[notLoginGuard] },
    {path:'dashboard' , component: DashboardComponent,title:'DashBoard',canActivate:[notLoginGuard] },
    {path:'doctordashboard' , component: DoctorDashboardComponent,title:'Doctor Dashboard',canActivate:[notLoginGuard] },
    // {path:'settings' , component: SettingsComponent,title:'setting',canActivate:[notLoginGuard] },
    {path:'diagnosisResult' , component: DiagnosisResultComponent,title:'Diagnosis Result',canActivate:[notLoginGuard] },
    {path:'treatment' , component: TreatementSuggestionComponent,title:'Treatment Suggestion',canActivate:[notLoginGuard] },
    {path:'profile' , component: ProfileComponent,title:'Profile',canActivate:[notLoginGuard] },
    {path:'login' , component: LoginComponent,title:'Login',canActivate:[notLoginGuard] },
    {path:'logout' , component: LogoutComponent,title:'Logout',canActivate:[notLoginGuard] },
    // {path:'forgetPassword', component:ForgetPasswordComponent, title:'Reset Password'},
    {path:'register', component: RegisterComponent, title:'Registration',canActivate:[notLoginGuard]},
     {path:'**', component:NotfoundComponent,title:'404 error'},
];
