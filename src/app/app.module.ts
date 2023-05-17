import { NgModule, ErrorHandler } from '@angular/core';
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
import { MatSelectModule} from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';
import { MatCardModule } from '@angular/material/card';
import { JwtService } from './services/jwt.service';
import { SearchLeaveComponent } from './components/search-leave/search-leave.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterPipe } from './pipes/search-pipe';
import { SortDirective } from './directives/sort.directive';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { LeaveCountConfigComponent } from './components/leave-count-config/leave-count-config.component';
import { LeaveBalanceComponent } from './components/leave-balance/leave-balance.component';
import { MatDialogModule} from '@angular/material/dialog';
import { ConformDialogComponent } from './components/conform-dialog/conform-dialog.component';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalenderComponent } from './components/calender/calender.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { CustomErrorHandler } from './services/custom-error-handler.service';
import { DevExtremeModule } from 'devextreme-angular';

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
    SortDirective,
    HeaderComponent,
    LeaveCountConfigComponent,
    LeaveBalanceComponent,
    ConformDialogComponent,
    CalenderComponent
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
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FullCalendarModule,
    MatSnackBarModule,
    DevExtremeModule
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,  
    useClass: HttpInterceptorService,  
    multi: true  
  },
  { 
    provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS
  },
  JwtService,
  {
    provide: ErrorHandler,
    useClass: CustomErrorHandler
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
