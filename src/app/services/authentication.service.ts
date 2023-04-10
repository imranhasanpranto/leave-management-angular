import { EventEmitter, Injectable, Output, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { JwtService } from './jwt.service';

import {BehaviorSubject, Subject, of } from "rxjs";
import { delay } from 'rxjs/operators';
import { Router } from "@angular/router";

const AUTH_API = 'http://localhost:8080/api/auth/';

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
          sessionStorage.setItem("email", email);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          let decoded = this.jwtService.DecodeToken(userData.token);
          let claims = JSON.parse(JSON.stringify(decoded));
          sessionStorage.setItem("role", claims.role);
          sessionStorage.setItem("userId", claims.userId);
          sessionStorage.setItem("state", 'true');

          
          this.loggedIn.next(true);
          this.loggedInRoleAdmin.next(claims.role == 'Admin');
          // this.timeout = claims.exp - claims.iat;
          // this.expirationCounter(this.timeout * 1000);
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
  //   let user = sessionStorage.getItem("email");
  //   return !(user === null);
  // }

  logOut() {
    // this.tokenSubscription.unsubscribe();
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
    sessionStorage.setItem("state", 'false');

    this.loggedIn.next(false);
    this.loggedInRoleAdmin.next(false);

    this.router.navigate(["/login"]);
  }

  getIsAdmin(){
    let role = sessionStorage.getItem("role");
    return role === null? false: (role === 'Admin'? true: false);
  }

  getRole(){
    return sessionStorage.getItem("role");
  }

  getUserId(): number{
    let userId = sessionStorage.getItem("userId");
    return userId === null? -1: userId as any;
  }

  getIsLoggedIn(){
    const state = sessionStorage.getItem('state');
    if(state === 'true'){
      return true;
    }else{
      return false;
    }
  }
}


