import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveApplication } from 'src/app/classes/leave-application';
import { LeaveApplicationService } from 'src/app/services/leave-application.service';
import { MatIconRegistry } from "@angular/material/icon";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CalenderComponent } from '../calender/calender.component';
import { MatDialog } from '@angular/material/dialog';
import { ConformDialogComponent } from '../conform-dialog/conform-dialog.component';
import { DialogData } from 'src/app/classes/dialog-data';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-leave',
  templateUrl: './search-leave.component.html',
  styleUrls: ['./search-leave.component.css']
})
export class SearchLeaveComponent implements OnInit{
  leaveRequests: LeaveApplication[] = [];
  searchText: string = "";
  imageApiUrl = environment.apiUrl + "/file/get-file/";

  userId: number = -1;
  isAdmin: boolean = false;

  constructor(
    private leaveService: LeaveApplicationService,
    private router: Router,
    private authService: AuthenticationService,
    private dialog: MatDialog
    ){}
  ngOnInit(): void {
    this.getAllApprovedRequests();
    this.userId = this.authService.getUserId();
    this.isAdmin = this.authService.getIsAdmin();
  }

  getAllApprovedRequests(){
    this.leaveService.getAllApprovedLeaveRequests().subscribe((data)=>this.leaveRequests = data);
  }

  editRequest(requestId: number){
    this.router.navigate([`edit-application/${requestId}`]);
  }

  cancelRequest(requestId: number){
    this.leaveService.cancelRequest(requestId).subscribe(message=>{
      this.leaveRequests = this.leaveRequests.filter(req => req.id !== requestId);
    });
  }


  openCalender(id: number){
    let data = {
      id: id
    }
    
    const dialogRef = this.dialog.open(
      CalenderComponent,
      {
        data: data,
        height: '550px',
        width: '600px',
      }
      );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      }
    });
  }


  openDialogue(id: number){
    console.log('called');
    let data: DialogData = {
      title: 'Delete Request',
      message: 'Are you sure to delete the request?', 
      confirmButtonText: 'Delete'
    }
    
    const dialogRef = this.dialog.open(
      ConformDialogComponent,
      {
        data: data
      }
      );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.cancelRequest(id);
      }
    });
  }

  applyForLeave(){
    this.router.navigate(["/add-application"]);
  }

}
