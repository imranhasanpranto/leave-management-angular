import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn$!: Observable<boolean>;
  isLoggedInRoleAdmin$!: Observable<boolean>;
  isAdmin!: boolean;

  constructor(private authService: AuthenticationService){}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedInRoleAdmin$ = this.authService.isLoggedInRoleAdmin;
    this.isAdmin = this.authService.getIsAdmin();
  }

  logout(){
    this.authService.logOut();
  }
}