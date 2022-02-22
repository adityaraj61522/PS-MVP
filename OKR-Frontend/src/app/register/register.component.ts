import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData={
    firstname:"",
    lastname:"",
    email:"",
    mobile:"",
    line_manager_id:"",
    emp_code:"",
    org_id:"",
    homeTown:"",
    gender:"",
    emp_dept:"",
    password:"",
  }
  userExist=false;

  @ViewChild('f') formData!: NgForm;
  registerForm!:  FormGroup;

  constructor( private http : HttpClient, private router : Router) { }

  submit(){
    this.userData.firstname=this.formData.value.firstname;
    this.userData.lastname=this.formData.value.lastname;
    this.userData.email=this.formData.value.email;
    this.userData.mobile=this.formData.value.mobile;
    this.userData.line_manager_id=this.formData.value.l1_manager;
    this.userData.emp_code=this.formData.value.emp_code;
    this.userData.org_id=this.formData.value.org_id;
    this.userData.gender=this.formData.value.gender;
    this.userData.homeTown=this.formData.value.homeTown;
    this.userData.password=this.formData.value.password;
    this.userData.emp_dept=this.formData.value.emp_dept;
    console.log(this.userData);

  
  }

  ngOnInit(): void {
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      firstname: new FormControl("", [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10)]),
      line_manager_id: new FormControl("", [Validators.required, Validators.minLength(2)]),
      emp_code: new FormControl("", [Validators.required]),
      org_id: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      homeTown: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      emp_dept: new FormControl("",[Validators.required]),
    });
  }
 

}