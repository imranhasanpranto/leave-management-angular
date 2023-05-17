import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ValidationsService } from 'src/app/services/validations.service';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { UserCacheServiceService } from 'src/app/services/user-cache-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit{
  @ViewChild(DxFormComponent, { static: false }) form!: DxFormComponent;
  signupForm: any= {}

  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, 
    private authService: AuthenticationService,
    private router: Router,
    private validationService: ValidationsService,
    private cacheUser: UserCacheServiceService
    ){}

  isSubmitted: boolean = false;
  invalidLogin: boolean = false;
  error: string | null = null;
  isRegistrationSuccessful: boolean = false;

  ngOnInit(): void {
    
  }

  namePattern: any = /^[^0-9]+$/;

  buttonOptions: any = {
    text: 'Login',
    type: 'success',
    useSubmitBehavior: true,
  };

  passwordOptions: any = {
    stylingMode: 'filled',
    placeholder: 'Password',
    mode: 'password'
  }

  asyncValidation = (params: any) =>{
    return this.validationService.isUserNameTaken(params.value, this.userService);
  }

  onSubmit(params: any){
    params.preventDefault();

    this.isSubmitted = true;

    this.authService
    .save(this.signupForm.name, this.signupForm.email, this.signupForm.password)
    .subscribe(
      data=>{
        this.invalidLogin = false
        this.isRegistrationSuccessful = true;
        console.log("isRegistrationSuccessful:", this.isRegistrationSuccessful);
        this.isSubmitted = false;
        this.form.instance.resetValues();
        this.cacheUser.clearCache();
      },
      error=>{
        this.invalidLogin = true
        this.error = error;
        notify({ message: error, width: 300, shading: true }, "error", 1000);
      }
    )
  }

  onReset(): void {
    this.isSubmitted = false;
    this.form.instance.resetValues();
  }
}
