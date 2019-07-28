import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/internal/operators";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm : FormGroup;
  public submitted : boolean = false;
  public genders=['M','F'];
  model: NgbDateStruct;

  constructor(private _authService: AuthService, private _router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this._formBuilder.group(
      {
        email: ['', Validators.required],
        username : ['', Validators.required],
        password: ['', Validators.required],
        confirm_password: ['', Validators.required],
        gender: ['', Validators.required],
        dob: ['', Validators.required]
      }
    );
  }


  get f() { return this.signupForm.controls; }

  signup(){

    this.submitted = true;

    if(this.signupForm.invalid){
      return;
    }
// console.log(this.signupForm.value);

    const {username,password,email,gender,dob, confirm_password} = this.signupForm.value;

    this._authService.signup({username,password,email,gender,dob,confirm_password}) .pipe(first())
      .subscribe(
        data => {
          this._router.navigate(["/home"]);
        },
        error => {
          // this.error = error;
          // this.loading = false;
        });
    // console.log(username);
  }




  redirectToLogin(){
    this._router.navigate(["/login"]);
  }


}
