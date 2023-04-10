import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveDays } from '../classes/leave-days';

@Injectable({
  providedIn: 'root'
})
export class LeaveDaysService {
  url: string = '';
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api/leave-days';
  }

  getLeaveDaysByApplicationId(appId: number): Observable<LeaveDays[]>{
    return this.http.get<LeaveDays[]>(`${this.url}/getLeaveDays/${appId}`);
  }
}
