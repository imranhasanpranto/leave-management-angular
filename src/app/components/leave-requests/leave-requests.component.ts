import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveApplication } from 'src/app/classes/leave-application';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LeaveApplicationService } from 'src/app/services/leave-application.service';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveRequestsComponent implements OnInit{
  leaveRequests: LeaveApplication[] = [];
  isAdmin!: boolean;
  userId!: number;

  constructor(private leaveService: LeaveApplicationService, 
    private authService: AuthenticationService,
    private router: Router
    ){}
  ngOnInit(): void {
    this.getAllPendingRequests();
    this.isAdmin = this.authService.isAdmin;
    this.userId = this.authService.userId;
  }

  getAllPendingRequests(){
    this.leaveService.getAllLeaveRequests().subscribe((data)=>this.leaveRequests = data);
  }

  approveRequest(requestId: number){
    this.leaveService.approveRequest(requestId).subscribe(message=>{
      console.log(message);
      this.leaveRequests = this.leaveRequests.filter(req => req.id !== requestId);
    });
    console.log(requestId);
  }

  rejectRequest(requestId: number){
    this.leaveService.rejectRequest(requestId).subscribe(message=>{
      console.log(message);
      this.leaveRequests = this.leaveRequests.filter(req => req.id !== requestId);
    });
  }

  editRequest(requestId: number){
    this.router.navigate([`edit-application/${requestId}`]);
  }

  cancelRequest(requestId: number){
    this.leaveService.cancelRequest(requestId).subscribe(message=>{
      console.log(message);
      this.leaveRequests = this.leaveRequests.filter(req => req.id !== requestId);
    });
  }

}
