import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveDays } from '../classes/leave-days';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveDaysService {
  url: string = '';
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl+ '/leave-days';
  }

  getLeaveDaysByApplicationId(appId: number|string): Observable<LeaveDays[]>{
    return this.http.get<LeaveDays[]>(`${this.url}/getLeaveDays/${appId}`);
  }
}
