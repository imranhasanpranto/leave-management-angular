import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  

  constructor(private http: HttpClient) { }

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
          return userData;
        }
      )
    )
  }

  public save(name: string, email: string, password: string): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(AUTH_API + 'register', {
      name,
      email,
      password
    }, httpOptions).pipe(
      map(
        userData =>{
          sessionStorage.setItem("email", email);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        }
      )
    )
   }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("email");
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
  }
}


