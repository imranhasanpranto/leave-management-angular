import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserCacheServiceService {
  private userCache: Observable<User[]> | null = null;
  constructor() { }

  getValue(): Observable<User[]>|null{
    return this.userCache;
  }

  setValue(value: Observable<User[]>){
    this.userCache = value;
  }

  clearCache(){
    this.userCache = null;
  }
}
