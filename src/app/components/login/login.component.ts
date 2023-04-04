import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  invalidLogin = false;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
    ){}
  loginForm!: FormGroup;
  isSubmitted: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );  


  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  submitForm(){
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      console.log('invalid form');
      return;
    }
    this.authService
    .authenticate(this.email?.value, this.password?.value)
    .subscribe(
      data=>{
        this.router.navigate(['/requests'])
        this.invalidLogin = false
        console.log('authentication successfull: ', data);
      },
      error=>{
        this.invalidLogin = true
        console.log('authentication error: ', error);
      }
    )
  }

  onReset(): void {
    this.isSubmitted = false;
    this.loginForm.reset();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(data=>this.users = data);
  }
  
}
