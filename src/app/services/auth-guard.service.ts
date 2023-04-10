import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService: AuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.getIsLoggedIn()){
      const role = this.authService.getRole();
      if(route.data['role'] && route.data['role'].indexOf(role) === -1){
        this.router.navigate(['requests']);
        return false;
      }
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }
}
