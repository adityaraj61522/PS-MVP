import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  registerObj: any;
  
  constructor(private fb :FormBuilder, private http : HttpClient,private router : Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname:["", Validators.required],
      lastname:["", Validators.required],
      mobile:["",Validators.required],
      username:["",Validators.compose([Validators.required,Validators.email])],
      password:["",Validators.required],
      emp_id:["",Validators.required],
      city:["",Validators.required],
      country:["",Validators.required]
    })
  }

//   register(){

//   this.registerObj.FirstName = this.registerForm.value.firstname;
//   this.registerObj.LastName = this.registerForm.value.lastname;
//   this.registerObj.UserName = this.registerForm.value.username;
//   this.registerObj.Password = this.registerForm.value.password;
//   this.registerObj.Emp_Id = this.registerForm.value.emp_id;
//   this.registerObj.Mobile = this.registerForm.value.mobile;
//   this.registerObj.city = this.registerForm.value.city;
//   this.registerObj.country = this.registerForm.value.country;
  
// }
}