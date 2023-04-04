import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { LeaveApplicationService } from 'src/app/services/leave-application.service';
import { ValidationsService } from 'src/app/services/validations.service';

const moment = _moment;

@Component({
  selector: 'app-leave-application-form',
  templateUrl: './leave-application-form.component.html',
  styleUrls: ['./leave-application-form.component.css']
})
export class LeaveApplicationFormComponent implements OnInit{
  leaveForm!: FormGroup;
  minDate!: Moment;
  maxDate!: Moment;
  selectedFiles!: FileList;

  leaveType: any[] = [
    {value: 'Casual', text: 'Casual'},
    {value: 'Sick', text: 'Sick'}
  ]

  selectedLeave = 'Casual';

  constructor(
    private formBuilder: FormBuilder, 
    private validator: ValidationsService,
    private leaveService: LeaveApplicationService,
    private router: Router
    ){}

  ngOnInit(): void {
    const currentYear = moment().year();
    // this.minDate = moment().add(1,'days');
    this.minDate = moment([currentYear , 0, 1]);
    this.maxDate = moment([currentYear, 11, 31]);

    console.log(this.minDate);
    console.log(this.maxDate);

    this.leaveForm = this.formBuilder.group(
      {
        fromDate:['', [Validators.required]],
        toDate: ['', [Validators.required]],
        leaveType: ['', Validators.required],
        reason: [''],
        emergencyContact: [''],
        attachment: ['']
      },
      {
        validator: this.validator.groupValidator('fromDate', 'toDate'),
      }
    )
  }

  onSubmit(){
    console.log(this.leaveForm.value);
    this.leaveApplicationSubmit();
  }

  leaveApplicationSubmit(){
    const formatDate = "YYYY-MM-DD HH:mm:ss";
    const leaveApplicationDTO: FormData = new FormData();
    leaveApplicationDTO.append('fromDate', this.leaveForm.get('fromDate')?.value.format(formatDate));
    leaveApplicationDTO.append('toDate', this.leaveForm.get('toDate')?.value.format(formatDate));
    leaveApplicationDTO.append('leaveType', this.leaveForm.get('leaveType')?.value);
    leaveApplicationDTO.append('leaveReason', this.leaveForm.get('reason')?.value);
    leaveApplicationDTO.append('emergencyContact', this.leaveForm.get('emergencyContact')?.value);
    leaveApplicationDTO.append('leaveType', this.leaveForm.get('leaveType')?.value);
    if(this.selectedFiles && this.selectedFiles.length > 0){
      leaveApplicationDTO.append('file', this.selectedFiles[0]);
    }

    this.leaveService.saveLeaveApplication(leaveApplicationDTO).subscribe(response=>{
      console.log('save successful', response);
      this.router.navigate(['requests']);
    },
    error=>{
      this.router.navigate(['requests']);
    }
    );
  }

  fileUpload(){
    if(this.selectedFiles && this.selectedFiles.length > 0){
      let selectedFile: File = this.selectedFiles[0];//this.selectedFiles.item(0);
      this.leaveService.saveFile(selectedFile).subscribe(response=>{
        console.log(response);
      }
      );
    }
  }

  onReset(){
    this.leaveForm.reset();
  }

  selectFile(event: Event){
    let fileList = (event.target as HTMLInputElement).files;
    if(fileList){
      this.selectedFiles = fileList;
    }
  }

}
