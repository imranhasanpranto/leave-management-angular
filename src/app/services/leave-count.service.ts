import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConfig } from '../classes/global-config';
import { UserLeaveBalance } from '../classes/UserLeaveBalance';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveCountService {
  private configUrl: string;
  private leaveCountUrl: string;

  constructor(private http: HttpClient) {
    this.configUrl = environment.apiUrl + '/config';
    this.leaveCountUrl = environment.apiUrl + '/annual-leave/getLeaveBalance';
  }

  getYearlyLeave(name: string): Observable<GlobalConfig>{
    return this.http.get<GlobalConfig>(`${this.configUrl}/getByName/${name}`);
  }

  updateYearlyLeave(data: FormData):Observable<any>{
    return this.http.put<any>(`${this.configUrl}/update`, data);
  }

  getLeaveBalance(): Observable<UserLeaveBalance>{
    return this.http.get<UserLeaveBalance>(this.leaveCountUrl);
  }

}
