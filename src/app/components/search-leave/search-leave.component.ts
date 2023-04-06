import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveApplication } from 'src/app/classes/leave-application';
import { LeaveApplicationService } from 'src/app/services/leave-application.service';
import { MatIconRegistry } from "@angular/material/icon";
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-search-leave',
  templateUrl: './search-leave.component.html',
  styleUrls: ['./search-leave.component.css']
})
export class SearchLeaveComponent implements OnInit{
  leaveRequests: LeaveApplication[] = [];
  searchText: string = "";

  userId: number = -1;

  constructor(
    private leaveService: LeaveApplicationService,
    private router: Router,
    private authService: AuthenticationService
    ){}
  ngOnInit(): void {
    this.getAllApprovedRequests();
    this.userId = this.authService.userId;
  }

  getAllApprovedRequests(){
    this.leaveService.getAllApprovedLeaveRequests().subscribe((data)=>this.leaveRequests = data);
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
