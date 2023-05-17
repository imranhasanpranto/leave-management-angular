import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveApplicationFormComponent } from './components/leave-application-form/leave-application-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';
import { SearchLeaveComponent } from './components/search-leave/search-leave.component';
import { LeaveCountConfigComponent } from './components/leave-count-config/leave-count-config.component';
import { LeaveBalanceComponent } from './components/leave-balance/leave-balance.component';

const roleInfoAdmin = {
  role: 'Admin'
}


const routes: Routes = [
  { path: '', redirectTo: 'search-leave', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'users', component: UsersComponent },
  { path: 'add-application', component: LeaveApplicationFormComponent, canActivate:[AuthGuardService] },
  { path: 'edit-application/:id', component: LeaveApplicationFormComponent, canActivate:[AuthGuardService] },
  { path: 'users', component: UsersComponent, canActivate:[AuthGuardService] },
  { path: 'search-leave', component: SearchLeaveComponent, canActivate:[AuthGuardService] },
  { path: 'requests', component: LeaveRequestsComponent, canActivate: [AuthGuardService] },
  { path: 'annual-leave', component: LeaveCountConfigComponent, canActivate: [AuthGuardService], data: roleInfoAdmin},
  { path: 'leave-balance', component: LeaveBalanceComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
