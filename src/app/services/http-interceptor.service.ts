import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import {catchError} from 'rxjs/operators'; 

@Injectable()
export class HttpInterceptorService implements HttpInterceptor{
  token!: string;
  constructor(private router: Router, private authService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (localStorage.getItem('email') != null && localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token')!;
      authReq = req.clone({ headers: req.headers
        .set('Authorization', this.token)});
    }
    return next.handle(authReq).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.authService.getIsLoggedIn()) {
          this.authService.logOut();
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
  }))as Observable<HttpEvent<any>>;
  }
}
