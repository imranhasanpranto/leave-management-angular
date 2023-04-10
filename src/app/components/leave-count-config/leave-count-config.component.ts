import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveCountService } from 'src/app/services/leave-count.service';

@Component({
  selector: 'app-leave-count-config',
  templateUrl: './leave-count-config.component.html',
  styleUrls: ['./leave-count-config.component.css']
})
export class LeaveCountConfigComponent implements OnInit{
  leaveCountForm! : FormGroup;
  name: string = 'leave-count';

  constructor(
    private builder: FormBuilder,
    private leaveCountService: LeaveCountService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.leaveCountForm = this.builder.group(
      {
        leaveCount: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(50)]]
      }
    );

    this.leaveCountService.getYearlyLeave(this.name).subscribe(data=>{
      this.leaveCountForm.get('leaveCount')?.setValue(data.configValue);
    });

  }

  update(){
    if(this.leaveCountForm.valid){
      const leaveCountFormData = new FormData();
      leaveCountFormData.append('configName', this.name);
      leaveCountFormData.append('configValue', this.leaveCountForm.get('leaveCount')?.value);

      this.leaveCountService.updateYearlyLeave(leaveCountFormData).subscribe(response=>{
        console.log('response:', response);
        this.router.navigate(['/requests']);
      })
    }
  }

}
