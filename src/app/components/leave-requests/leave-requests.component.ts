import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LeaveApplication } from 'src/app/classes/leave-application';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LeaveApplicationService } from 'src/app/services/leave-application.service';
import { ConformDialogComponent } from '../conform-dialog/conform-dialog.component';
import { DialogData } from 'src/app/classes/dialog-data';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CalenderComponent } from '../calender/calender.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit{
  leaveRequests: LeaveApplication[] = [];
  leaveRequestsMat: MatTableDataSource<LeaveApplication> = new MatTableDataSource<LeaveApplication>();
  isAdmin!: boolean;
  userId!: number;
  searchKey: string = "";
  imageApiUrl = environment.apiUrl + "/file/get-file/";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  

  columnsToDisplay: string[] = ['userName', 'fromDate', 'toDate', 'leaveType', 'leaveReason', 'emergencyContact', 'attachment', 'viewOnCalender', 'actions']

  constructor(private leaveService: LeaveApplicationService, 
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
    ){}
  ngOnInit(): void {
    this.getAllPendingRequests();
    this.isAdmin = this.authService.getIsAdmin();
    this.userId = this.authService.getUserId();
  }

  getAllPendingRequests(){
    this.leaveService.getAllLeaveRequests().subscribe((data)=>{
      this.leaveRequests = data;
    });
  }

  approveRequest(requestId: number|string){
    this.leaveService.approveRequest(requestId).subscribe(message=>{
      this.updateDataSource(requestId);
    });
    console.log(requestId);
  }

  openDialogue(id: number|string, actionName: string){
    let data: DialogData;

    if(actionName === 'approve'){
      data = {
        title: 'Approve Request',
        message: 'Are you sure to approve the request?', 
        confirmButtonText: 'Approve'
      }
    }else if(actionName === 'reject'){
      data = {
        title: 'Reject Request',
        message: 'Are you sure to reject the request?', 
        confirmButtonText: 'Reject'
      }
    }else{ //defualt delete
      data = {
        title: 'Delete Request',
        message: 'Are you sure to delete the request?', 
        confirmButtonText: 'Delete'
      }
    }
    const dialogRef = this.dialog.open(
      ConformDialogComponent,
      {
        data: data
      }
      );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(actionName === 'approve'){
          this.approveRequest(id);
        }else if(actionName === 'reject'){
          this.rejectRequest(id);
        }else{
          this.cancelRequest(id);
        }
        
      }
    });
  }


  rejectRequest(requestId: number|string){
    this.leaveService.rejectRequest(requestId).subscribe(message=>{
      this.updateDataSource(requestId);
    });
  }

  editRequest(requestId: number|string){
    this.router.navigate([`edit-application/${requestId}`]);
  }

  cancelRequest(requestId: number|string){
    this.leaveService.cancelRequest(requestId).subscribe(message=>{
      this.updateDataSource(requestId);
    });
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.leaveRequestsMat.filter = this.searchKey.trim().toLowerCase();
  }

  updateDataSource(id: number|string){
    this.leaveRequests = this.leaveRequests.filter(req => req.id !== id);
    
  }


  openCalender(id: number|string){
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

  applyForLeave(){
    this.router.navigate(["/add-application"]);
  }

}
