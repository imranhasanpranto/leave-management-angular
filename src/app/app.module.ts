import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LeaveApplicationFormComponent } from './components/leave-application-form/leave-application-form.component';

import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from './date-formats';
import {MatSelectModule} from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';
import { MatCardModule } from '@angular/material/card';
import { JwtService } from './services/jwt.service';
import { SearchLeaveComponent } from './components/search-leave/search-leave.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterPipe } from './pipes/search-pipe';
import { SortDirective } from './directives/sort.directive';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UsersComponent,
    LeaveApplicationFormComponent,
    LeaveRequestsComponent,
    SearchLeaveComponent,
    FilterPipe,
    SortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSelectModule,
    NgbModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,  
      useClass: HttpInterceptorService,  
      multi: true  
  },
  { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
  JwtService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
