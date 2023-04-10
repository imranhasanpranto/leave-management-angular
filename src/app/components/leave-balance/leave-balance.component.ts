import { Component, OnInit } from '@angular/core';
import { LeaveCountService } from 'src/app/services/leave-count.service';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.css']
})
export class LeaveBalanceComponent implements OnInit{
  leaveBalance!: number;
  ngOnInit(): void {
    this.leaveCountService.getLeaveBalance().subscribe(data=>{
      this.leaveBalance = data.value;
    });
  }

  constructor(private leaveCountService: LeaveCountService){}
  

}
