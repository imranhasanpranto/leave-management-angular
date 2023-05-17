import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable, throwError, shareReplay } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserCacheServiceService } from './user-cache-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string;


  constructor(private http: HttpClient, private userCache: UserCacheServiceService) {
    this.usersUrl = environment.apiUrl+ "/user";
   }

   
   
   public getAllUsers(): Observable<User[]>{
    let cache$ = this.userCache.getValue();
    if(!cache$){
      cache$ = this.http.get<User[]>(`${this.usersUrl}/list`)
      .pipe(
        shareReplay(1),
        catchError((error)=>{
          console.log(error);
          return throwError(error);
        })
      );
      this.userCache.setValue(cache$);
    }
    return cache$;
   }

   public isUserNameTaken(userName: string):Observable<any>{
    return this.http.get<any>(`${this.usersUrl}/isUserEmailTaken/${userName}`);
   }

   public test(): boolean{
      return true;
   }

}
