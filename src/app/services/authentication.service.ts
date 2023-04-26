import { EventEmitter, Injectable, Output, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment';

import {BehaviorSubject, Subject, of } from "rxjs";
import { delay } from 'rxjs/operators';
import { Router } from "@angular/router";

const AUTH_API = environment.apiUrl+'/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  tokenSubscription = new Subscription();
  timeout: number = 0;

  private loggedIn: BehaviorSubject<boolean>;

  private loggedInRoleAdmin: BehaviorSubject<boolean>;

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  get isLoggedInRoleAdmin(){
    return this.loggedInRoleAdmin.asObservable();
  }

  constructor(private http: HttpClient, 
    private jwtService: JwtService,
    private router: Router
    ) {
      this.loggedIn = new BehaviorSubject(this.getIsLoggedIn());
      this.loggedInRoleAdmin = new BehaviorSubject(this.getIsAdmin());
    }

  authenticate(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_API + 'authenticate', {
      email,
      password
    }, httpOptions).pipe(
      map(
        userData =>{
          localStorage.setItem("email", email);
          let tokenStr = "Bearer " + userData.token;
          localStorage.setItem("token", tokenStr);
          let decoded = this.jwtService.DecodeToken(userData.token);
          let claims = JSON.parse(JSON.stringify(decoded));
          localStorage.setItem("role", claims.role);
          localStorage.setItem("userId", claims.userId);
          localStorage.setItem("state", 'true');

          
          this.loggedIn.next(true);
          this.loggedInRoleAdmin.next(claims.role == 'Admin');
          return userData;
        }
      )
    )
  }

  // expirationCounter(timeout: number) {
  //   this.tokenSubscription.unsubscribe();
  //   this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
  //     console.log('EXPIRED!!');

  //     this.logOut();
  //     this.router.navigate(["/login"]);
  //   });
  // }

  public save(name: string, email: string, password: string): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(AUTH_API + 'register', {
      name,
      email,
      password
    }, httpOptions).pipe(
      map(
        userData =>{
          return userData;
        }
      )
    )
   }

  // isUserLoggedIn() {
  //   let user = localStorage.getItem("email");
  //   return !(user === null);
  // }

  logOut() {
    // this.tokenSubscription.unsubscribe();
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.setItem("state", 'false');

    this.loggedIn.next(false);
    this.loggedInRoleAdmin.next(false);

    this.router.navigate(["/login"]);
  }

  getIsAdmin(){
    let role = localStorage.getItem("role");
    return role === null? false: (role === 'Admin'? true: false);
  }

  getRole(){
    return localStorage.getItem("role");
  }

  getUserId(): number{
    let userId = localStorage.getItem("userId");
    return userId === null? -1: userId as any;
  }

  getIsLoggedIn(){
    const state = localStorage.getItem('state');
    if(state === 'true'){
      return true;
    }else{
      return false;
    }
  }
}


