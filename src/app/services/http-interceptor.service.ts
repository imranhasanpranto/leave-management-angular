import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor{
  token!: string;
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('email') && sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token')!;
      req = req.clone({ headers: req.headers
        .set('Authorization', this.token)});
    }else{
      this.router.navigate(['login']);
    }
    return next.handle(req);
  }
}
