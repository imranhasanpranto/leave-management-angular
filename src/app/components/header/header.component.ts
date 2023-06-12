import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  headerTitle: string = "Leave Management System";

  constructor(private authService: AuthenticationService, private router: Router){}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedInRoleAdmin$ = this.authService.isLoggedInRoleAdmin;
    this.isAdmin = this.authService.getIsAdmin();
  }

  logout(){
    this.authService.logOut();
  }

  loadPage(pageUrl: string){
    this.router.navigate([pageUrl]);
  }
}
