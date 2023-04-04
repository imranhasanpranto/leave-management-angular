import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  user: User = {
    id: -1,
    name: "pranto",
    email: "pranto@gmail.com",
    password: "1234",
    userType: 1
  };

  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, 
    private authService: AuthenticationService,
    private router: Router
    ){}

  form!: FormGroup;
  isSubmitted: boolean = false;
  invalidLogin: boolean = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );  
  }

  get name(){
    return this.form.get('name');
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  submitForm(){
    this.isSubmitted = true;
    console.log(this.form.value);
    if(this.form.invalid){
      return;
    }

    this.authService
    .save(this.name?.value, this.email?.value, this.password?.value)
    .subscribe(
      data=>{
        this.router.navigate(['login'])
        this.invalidLogin = false
        console.log('registration successfull: ', data);
      },
      error=>{
        this.invalidLogin = true
        console.log('authentication error: ', error);
      }
    )
  }

  onReset(): void {
    this.isSubmitted = false;
    this.form.reset();
  }

  
}
