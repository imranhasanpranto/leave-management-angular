import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveApplicationFormComponent } from './components/leave-application-form/leave-application-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';

const routes: Routes = [
  { path: '', redirectTo: 'requests', pathMatch: 'full' },
  // { path: '', component: UsersComponent, canActivate:[AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'leave-application', component: LeaveApplicationFormComponent, canActivate:[AuthGuardService] },
  { path: 'users', component: UsersComponent, canActivate:[AuthGuardService] },
  { path: 'requests', component: LeaveRequestsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
