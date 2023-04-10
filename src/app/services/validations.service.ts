import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { FormGroup, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { UserService } from './user.service';
import { Observable, catchError, map } from 'rxjs';
import { LeaveApplicationService } from './leave-application.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor(private userService: UserService) { }



  groupValidator(minDate: string, maxDate: string)  {
    return (formGroup: FormGroup) => {
      //console.log("called");
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


  userNameValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors|null> => {
      return userService
        .isUserNameTaken(control.value)
        .pipe(
          map((result) =>
            result.status ? { usernameAlreadyExists: true } : null
          )
        );
    };
  }

  leaveCountValidator(leaveService: LeaveApplicationService, id: number): AsyncValidatorFn {
    return (formGroup: AbstractControl): Observable<ValidationErrors|null> => {
      return leaveService.isAnnualLeaveCountExceeds(Date.parse(formGroup.value.fromDate), Date.parse(formGroup.value.toDate), id)
        .pipe(
          map((result) =>
            result.status ? { leaveCountExceeds: true } : null
          )
        );
    };
  }

}
