import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import dxDateBox from 'devextreme/ui/date_box';
import { ValueChangedEvent } from 'devextreme/ui/file_uploader';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { first } from 'rxjs';
import { LeaveApplication } from 'src/app/classes/leave-application';
import { LeaveApplicationService } from 'src/app/services/leave-application.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationsService } from 'src/app/services/validations.service';
import { environment } from 'src/environments/environment';

const moment = _moment;

@Component({
  selector: 'app-leave-application-form',
  templateUrl: './leave-application-form.component.html',
  styleUrls: ['./leave-application-form.component.css']
})
export class LeaveApplicationFormComponent implements OnInit{
  
  @ViewChild(DxFormComponent, { static: false }) form!:DxFormComponent;
  leaveApplicationForm: LeaveApplication;
  minDate: Date = new Date();
  maxDate: Date = new Date();

  blockedDates: Number[] = [];

  id: string = '';
  idValue: number = -1;
  isAddMode: boolean = true;
  isFileUpdated: boolean = false;
  leaveApplicationDTO: FormData = new FormData();

  editImageUrl: string = environment.apiUrl + "/file/get-file/";
  isImageUploaded: boolean = false;

  leaveType: string[] = [
    'Casual',
    'Sick'
  ]

  constructor(
    private validator: ValidationsService,
    private leaveService: LeaveApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.leaveApplicationForm = {
      id: -1,
      userId: -1,
      userName: "",
      fromDate: null,
      toDate: null,
      leaveReason: '',
      emergencyContact: '',
      leaveType: '',
      filePath: '',
      applicationStatus: '',
      attachment: {} as File,
      isFileUpdated: false
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.idValue = this.id? this.id as any: -1;
    this.isAddMode = !this.id;

    const dataId: number = this.isAddMode?-1: this.id as any;

    this.leaveService.getAllLeaveDates(dataId).subscribe(list => 
      {
        this.blockedDates = list.map(day=> new Date(day).valueOf());
      });

    const currentYear = moment().year();
    this.minDate = new Date(this.minDate.getFullYear(), 0, 1);
    this.maxDate = new Date(this.minDate.getFullYear(), 11, 31);

    if(!this.isAddMode){
      this.leaveService.getLeaveRequestById(this.id as any)
      .pipe(first())
      .subscribe(x=>{
        this.leaveApplicationForm = x;

        this.leaveApplicationForm.fromDate = this.formatDate(this.leaveApplicationForm.fromDate as string);
        this.leaveApplicationForm.toDate = this.formatDate(this.leaveApplicationForm.toDate as string);

        this.editImageUrl = this.editImageUrl + this.leaveApplicationForm.filePath;
        if(x.filePath){
          this.isImageUploaded = true;
        }
      });
    }
  }

  formatDate(date: string): Date{
    const initialFormat = "yyyy-MM-DD";
    return moment(date, initialFormat).toDate();
  }

  buttonOptions: any = {
    text: 'Submit',
    type: 'success',
    useSubmitBehavior: true,
  };

  onSubmit(params: any){
    params.preventDefault();
    const formatDate = "YYYY-MM-DD HH:mm:ss";
    let fromDate = moment(this.leaveApplicationForm.fromDate);
    let toDate = moment(this.leaveApplicationForm.toDate);

    this.leaveApplicationDTO.append('fromDate', fromDate.format(formatDate));
    this.leaveApplicationDTO.append('toDate', toDate.format(formatDate));
    this.leaveApplicationDTO.append('leaveType', this.leaveApplicationForm.leaveType as any as string);
    this.leaveApplicationDTO.append('leaveReason', this.leaveApplicationForm.leaveReason as any as string);
    this.leaveApplicationDTO.append('emergencyContact', this.leaveApplicationForm.emergencyContact as any as string);
    this.leaveApplicationDTO.append('isFileUpdated', this.isFileUpdated? 'true': 'false');

    if(this.isAddMode){
      this.leaveService.saveLeaveApplication(this.leaveApplicationDTO).subscribe(response=>{
          this.router.navigate(['requests']);
        },
        error=>{
          this.router.navigate(['requests']);
        }
      );
    }else{
      this.leaveApplicationDTO.append("id", this.id);
      this.leaveService.updateLeaveApplication(this.leaveApplicationDTO).subscribe(response=>{
          this.router.navigate(['requests']);
        },
        error=>{
          this.router.navigate(['requests']);
        }
      );
    }
    
  }

  dateRangeValidate = (date: any) => {
    let fromDate = this.form.instance.option('formData').fromDate;
    let toDate = date.value;
    let status = fromDate && toDate && fromDate.getDate() <= toDate.getDate();
    return status;
  }


  dateFilter: (dateOb: DateObject | null) => boolean =
    (dateOb: DateObject | null) => {
      if(!dateOb){
        return true;
      }
      const day = dateOb.date.getDay();
      const momentDate = moment(dateOb.date);
      const baseValue = new Date(momentDate.format("yyyy-MM-DD")).valueOf();
      return this.blockedDates.includes(baseValue) || day == 0 || day == 6;
  }

  isLeaveCountExceeded = (params: any) =>{
    let fromDate = this.form.instance.option('formData').fromDate;
    let toDate = params.value;
    return this.validator.isLeaveCountExceeded(fromDate, toDate, this.idValue, this.leaveService);
  }
  
  onFileUpload(file: ValueChangedEvent){
    this.isFileUpdated = true;
    this.leaveApplicationDTO.append("file", file.value![0]);
    this.isImageUploaded = true;

    var reader = new FileReader();
    reader.readAsDataURL(file.value![0]);
    reader.onload = (event) => {
      this.editImageUrl = event.target?.result as string;
    }
  }
}

interface DateObject{
  component: dxDateBox,
  date: Date,
  view: String
}
