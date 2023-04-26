import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string;

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     Authorization: 'my-auth-token'
  //   })
  // };

  constructor(private http: HttpClient) {
    this.usersUrl = environment.apiUrl+ "/user";
   }

   
   
   public getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.usersUrl}/list`)
    .pipe(
      catchError((error)=>{
        console.log(error);
        return throwError(error);
      })
    );
   }

   public isUserNameTaken(userName: string):Observable<any>{
    return this.http.get<any>(`${this.usersUrl}/isUserEmailTaken/${userName}`);
   }

}
