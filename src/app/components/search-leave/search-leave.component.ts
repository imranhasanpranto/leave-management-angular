import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveApplication } from 'src/app/classes/leave-application';
import { LeaveApplicationService } from 'src/app/services/leave-application.service';
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: 'app-search-leave',
  templateUrl: './search-leave.component.html',
  styleUrls: ['./search-leave.component.css']
})
export class SearchLeaveComponent implements OnInit{
  leaveRequests: LeaveApplication[] = [];
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText: string = "";

  constructor(
    private leaveService: LeaveApplicationService,
    private router: Router
    ){}
  ngOnInit(): void {
    this.getAllApprovedRequests();
  }

  getAllApprovedRequests(){
    this.leaveService.getAllApprovedLeaveRequests().subscribe((data)=>this.leaveRequests = data);
  }

}
