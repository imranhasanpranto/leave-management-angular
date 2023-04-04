import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { ValidatorFn, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  
  // dateRangeValidator(min: Date, max: Date): ValidatorFn {
  //   return control => {
  //     if (!control.value) return null;
  
  //     const dateValue = new Date(control.value);
  
  //     if (min && dateValue < min) {
  //       return { message: 'error message' };
  //     }
  
  //     if (max && dateValue > max) {
  //       return { message: 'error message' };
  //     }
  
  //     return null;
  //   }
  // }

  groupValidator(minDate: string, maxDate: string)  {
    return (formGroup: FormGroup) => {
      //console.log("called");
      const fromDate = formGroup.controls[minDate];
      const toDate = formGroup.controls[maxDate];
      if (!fromDate || !toDate) {
        console.log('one of dates is null');
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

}
