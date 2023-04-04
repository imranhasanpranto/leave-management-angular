import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveApplication } from '../classes/leave-application';

// const httpOptions = {
//     headers: new HttpHeaders({
//       'responseType':  'application/json'
//     })
//   };

@Injectable({
  providedIn: 'root'
})
export class LeaveApplicationService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api/leave/application';
   }

  saveFile(file: File): Observable<string>{
    const data: FormData = new FormData();
    data.append('file', file);

    return this.http.post<any>(`${this.url}/uploadFile`, data);
  }

  saveLeaveApplication(data: FormData): Observable<any>{
    return this.http.post<any>(`${this.url}/add`, data);
  }

  getAllLeaveRequests(): Observable<LeaveApplication[]>{
    return this.http.get<LeaveApplication[]>(`${this.url}/pendingList`);
  }

  getAllApprovedLeaveRequests(): Observable<LeaveApplication[]>{
    return this.http.get<LeaveApplication[]>(`${this.url}/approvedList`);
  }

  approveRequest(requestId: number): Observable<any>{
    return this.http.put<any>(`${this.url}/approve/${requestId}`, {});
  }

  rejectRequest(requestId: number): Observable<any>{
    return this.http.put<any>(`${this.url}/reject/${requestId}`, {});
  }

  cancelRequest(requestId: number): Observable<any>{
    return this.http.put<any>(`${this.url}/cancel/${requestId}`, {});
  }

}
