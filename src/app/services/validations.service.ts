import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { FormGroup, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { UserService } from './user.service';
import { Observable, catchError, map } from 'rxjs';
import { LeaveApplicationService } from './leave-application.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }



  groupValidator(minDate: string, maxDate: string)  {
    return (formGroup: FormGroup) => {
      console.log("called");
      const fromDate = formGroup.controls[minDate];
      const toDate = formGroup.controls[maxDate];
      if (!fromDate || !toDate) {
        return null;
      }

      if(!fromDate.value || !toDate.value){
        return null;
      }

      if (fromDate.value > toDate.value) {
        toDate.setErrors({'inValidDateRange': true});
        return null;
      } else {
        toDate.setErrors(null);
        return null;
      }
    }
  }

  isUserNameTaken(email: string, authService: AuthenticationService){
    const promise = new Promise<void>((resolve, reject) => {
      authService.isUserNameTaken(email).subscribe({
        next: (res: any) => {
          if(res.status){
            reject();
          }else{
            resolve();
          }
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }

  isLeaveCountExceeded(fromDate: Date, toDate: Date, id: number|string, leaveService: LeaveApplicationService){
    const promise = new Promise<void>((resolve, reject) => {
      leaveService.isAnnualLeaveCountExceeds(Date.parse(fromDate.toDateString()), Date.parse(toDate.toDateString()), id).subscribe({
        next: (res: any) => {
          if(res.status){
            reject();
          }else{
            resolve();
          }
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }

  leaveCountValidator(leaveService: LeaveApplicationService, id: number): AsyncValidatorFn {
    return (formGroup: AbstractControl): Observable<ValidationErrors|null> => {
      return leaveService.isAnnualLeaveCountExceeds(Date.parse(formGroup.value.fromDate), Date.parse(formGroup.value.toDate), id)
        .pipe(
          map((result) =>
            result.status ? { leaveCountExceeds: true } : (formGroup.value.fromDate > formGroup.value.toDate? {inValidDateRange:true}: null)
          )
        );
    };
  }

}
