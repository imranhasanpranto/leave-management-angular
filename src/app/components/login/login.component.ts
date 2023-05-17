import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  invalidLogin = false;
  error: string | null = null;

  @ViewChild(DxFormComponent, { static: false }) form!: DxFormComponent;
  loginForm: any= {}

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(): void {
    
  }

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

  onSubmit(params: any){
    params.preventDefault();

    this.authService
    .authenticate(this.loginForm.email, this.loginForm.password)
    .subscribe(
      data=>{
        this.router.navigate(['/requests'])
        this.invalidLogin = false
        console.log('authentication successfull: ', data);
      },
      error=>{
        this.invalidLogin = true
        this.error = error;
        notify({ message: error, width: 300, shading: true }, "error", 1000);
      }
    )
  }
  
}
