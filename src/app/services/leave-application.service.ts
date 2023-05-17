import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveApplication } from '../classes/leave-application';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'responseType':  'blob'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class LeaveApplicationService {
  private url: string;
  private fileUrl: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl+'/leave/application';
    this.fileUrl = environment.apiUrl+'/file/get-file';
   }

  saveFile(file: File): Observable<string>{
    const data: FormData = new FormData();
    data.append('file', file);

    return this.http.post<any>(`${this.url}/uploadFile`, data);
  }

  getLeaveRequestById(id: number): Observable<LeaveApplication>{
    return this.http.get<LeaveApplication>(`${this.url}/getById/${id}`);
  }

  saveLeaveApplication(data: FormData): Observable<any>{
    return this.http.post<any>(`${this.url}/add`, data);
  }

  updateLeaveApplication(data: FormData): Observable<any>{
    return this.http.put<any>(`${this.url}/update`, data);
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

  getFileByPath(path: string): Observable<Blob>{
    return this.http.get<Blob>(`${this.fileUrl}/${path}`, httpOptions);
  }

  getAllLeaveDates(id: number): Observable<Date[]>{
    return this.http.get<Date[]>(`${this.url}/getAllLeaveDates/${id}`);
  }

  public isAnnualLeaveCountExceeds(fromDate: number, toDate: number, id: number):Observable<any>{
    return this.http.get<any>(`${this.url}/isAnnualLeaveCountExceeds/${fromDate}/${toDate}/${id}`);
   }

}
