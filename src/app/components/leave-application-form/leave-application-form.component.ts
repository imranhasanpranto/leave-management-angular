import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { first } from 'rxjs';
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

  leaveDates: Date[] = []
  blockedDates: Number[] = [];


  id: string = '';
  idValue: number = -1;
  isAddMode: boolean = true;
  isFileUpdated: boolean = false;
  imageUrl = '';

  @ViewChild('attachment', { static : false}) fileInput! : ElementRef;

  leaveType: any[] = [
    {value: 'Casual', text: 'Casual'},
    {value: 'Sick', text: 'Sick'}
  ]

  selectedLeave = '';

  constructor(
    private formBuilder: FormBuilder, 
    private validator: ValidationsService,
    private leaveService: LeaveApplicationService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.idValue = this.id? this.id as any: -1;
    this.isAddMode = !this.id;

    const dataId: number = this.isAddMode?-1: this.id as any;

    this.leaveService.getAllLeaveDates(dataId).subscribe(list => 
      {
        this.leaveDates = list;
        this.blockedDates = list.map(day=> new Date(day).valueOf());
      });

    const currentYear = moment().year();
    // this.minDate = moment().add(1,'days');
    this.minDate = moment([currentYear , 0, 1]);
    this.maxDate = moment([currentYear, 11, 31]);

    this.leaveForm = this.formBuilder.group(
      {
        fromDate:['', [Validators.required]],
        toDate: ['', [Validators.required]],
        leaveType: ['', Validators.required],
        leaveReason: [''],
        emergencyContact: [''],
        attachment: ['']
      },
      {
        // validator: [this.validator.groupValidator('fromDate', 'toDate')],
        asyncValidators: [this.validator.leaveCountValidator(this.leaveService, this.idValue)]
        // validator: Validators.composeAsync(
        //   [(control:AbstractControl) => Promise.resolve(this.validator.groupValidator('fromDate', 'toDate'))]),
        // asyncValidators: [this.validator.leaveCountValidator(this.leaveService, this.idValue)]
        // asyncValidators: Validators.composeAsync(
        //   [(control:AbstractControl) => Promise.resolve(this.validator.groupValidator('fromDate', 'toDate')), 
        //   this.validator.leaveCountValidator(this.leaveService, this.idValue)]
        //   )
      }
    )

    if(!this.isAddMode){
      this.leaveService.getLeaveRequestById(this.id as any)
      .pipe(first())
      .subscribe(x=>{
        //this.leaveForm.patchValue(x);

        this.leaveForm.get('fromDate')?.patchValue(moment(new Date(x.fromDate)));
        this.leaveForm.get('toDate')?.patchValue(moment(new Date(x.toDate)));
        this.leaveForm.get('leaveType')?.patchValue(x.leaveType);
        this.leaveForm.get('leaveReason')?.patchValue(x.leaveReason);
        this.leaveForm.get('emergencyContact')?.patchValue(x.emergencyContact);
        this.imageUrl = "http://localhost:8080/api/file/get-file/"+x.filePath;

        if(x.filePath !== null && x.filePath !== ""){

          //this.leaveService.getFileByPath(x.filePath).subscribe(data=>);

          //let fileName = x.filePath.split("/")[1].split("_")[1];
          let rawFileName = x.filePath.split("/")[1];
          let splitPos = rawFileName.indexOf("_");
          let fileName = rawFileName.substring(splitPos+1);
          const data = new ClipboardEvent('').clipboardData || new DataTransfer();
          data.items.add(new File([], fileName));
          this.fileInput.nativeElement.files = data.files;
          // this.fileInput.nativeElement.value = data.files[0];

          this.leaveForm.get('attachment')?.setValue(data.files[0]);
        }
        
      });
    }
  }

  onSubmit(){
    console.log(this.leaveForm.value);
    if(this.isAddMode){
      this.leaveApplicationAdd();
    }else{
      this.leaveApplicationUpdate();
    }
    
  }

  leaveApplicationUpdate(){
    
    const leaveApplicationDTO: FormData = this.getFormData();
    leaveApplicationDTO.append("id", this.id);
    this.leaveService.updateLeaveApplication(leaveApplicationDTO).subscribe(response=>{
      console.log('save successful', response);
      this.router.navigate(['requests']);
    },
    error=>{
      this.router.navigate(['requests']);
    }
    );
  }

  leaveApplicationAdd(){
    
    const leaveApplicationDTO: FormData = this.getFormData();
    this.leaveService.saveLeaveApplication(leaveApplicationDTO).subscribe(response=>{
      console.log('save successful', response);
      this.router.navigate(['requests']);
    },
    error=>{
      this.router.navigate(['requests']);
    }
    );
  }

  getFormData(): FormData{
    const formatDate = "YYYY-MM-DD HH:mm:ss";
    const leaveApplicationDTO: FormData = new FormData();
    leaveApplicationDTO.append('fromDate', this.leaveForm.get('fromDate')?.value.format(formatDate));
    leaveApplicationDTO.append('toDate', this.leaveForm.get('toDate')?.value.format(formatDate));
    leaveApplicationDTO.append('leaveType', this.leaveForm.get('leaveType')?.value);
    leaveApplicationDTO.append('leaveReason', this.leaveForm.get('leaveReason')?.value);
    leaveApplicationDTO.append('emergencyContact', this.leaveForm.get('emergencyContact')?.value);
    leaveApplicationDTO.append('leaveType', this.leaveForm.get('leaveType')?.value);
    leaveApplicationDTO.append('isFileUpdated', this.isFileUpdated? 'true': 'false');
    console.log('attachment: ', this.leaveForm.get('attachment')?.value);
    if(this.leaveForm.get('attachment')?.value){
      leaveApplicationDTO.append("file", this.leaveForm.get('attachment')?.value);
    }
    return leaveApplicationDTO;
  }

  onReset(){
    this.leaveForm.reset();
  }

  selectFile(event: Event){
    let fileList = (event.target as HTMLInputElement).files;
    this.isFileUpdated = true;
    if(fileList && fileList.length > 0){
      this.leaveForm.get('attachment')?.setValue(fileList[0]);
      var reader = new FileReader();

      reader.readAsDataURL(fileList[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageUrl = event.target?.result as string;
      }
    }else{
      this.leaveForm.get('attachment')?.setValue(null);
      this.imageUrl = '';
    }
  }


  dateFilter: (date: Moment | null) => boolean =
    (date: Moment | null) => {
      if(!date){
        return true;
      }
      const day = date?.day();
      const baseValue = new Date(date.format("yyyy-MM-DD")).valueOf();
      return (!this.blockedDates.includes(baseValue)) && day !== 0 && day !== 6;
  }

}
