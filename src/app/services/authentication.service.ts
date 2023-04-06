import { EventEmitter, Injectable, Output } from '@angular/core';
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

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //public isLoggedIn: boolean = false;
  public userId: number = -1;
  public isAdmin: boolean = false;

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient, 
    private jwtService: JwtService,
    private router: Router
    ) { }

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

          
          this.loggedIn.next(true);
          this.userId = claims.userId;
          this.isAdmin = claims.role === 'Admin';
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

    this.loggedIn.next(false);
    this.userId = -1;
    this.isAdmin = false;

    this.router.navigate(["/login"]);
  }

  // isAdmin(){
  //   let role = sessionStorage.getItem("role");
  //   console.log('role:', role);
  //   return role === null? false: (role === 'Admin'? true: false);
  // }

  // getUserId(): number{
  //   let userId = sessionStorage.getItem("userId");
  //   return userId === null? -1: userId as any;
  // }
}


