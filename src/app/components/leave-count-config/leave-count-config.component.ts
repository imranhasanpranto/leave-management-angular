import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConfig } from 'src/app/classes/global-config';
import { LeaveCountService } from 'src/app/services/leave-count.service';

@Component({
  selector: 'app-leave-count-config',
  templateUrl: './leave-count-config.component.html',
  styleUrls: ['./leave-count-config.component.css']
})
export class LeaveCountConfigComponent implements OnInit{
  

    annualLeaveCountForm: GlobalConfig;
    annualLeaveCount: number = 22;
    name: string = 'leave-count';

    constructor(
      private leaveCountService: LeaveCountService,
      private router: Router
    ){
      this.annualLeaveCountForm = {
        id: -1,
        configName: "not assigned",
        configValue: 22
      }
    }

    buttonOptions: any = {
      text: 'Update',
      type: 'success',
      useSubmitBehavior: true,
    };

    ngOnInit(): void {
      this.leaveCountService.getYearlyLeave(this.name).subscribe(data=>{
        this.annualLeaveCountForm = data;
      });
    }

    onSubmit(params: any){
      params.preventDefault();
  
      const leaveCountFormData = new FormData();
      leaveCountFormData.append('configName', this.name);
      leaveCountFormData.append('configValue', this.annualLeaveCountForm.configValue as any as string);

      this.leaveCountService.updateYearlyLeave(leaveCountFormData).subscribe(response=>{
        console.log('response:', response);
        this.router.navigate(['/requests']);
      })
    }

}
