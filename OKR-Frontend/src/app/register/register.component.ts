import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData={
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    mobile:"",
    emp_code:"",
    org_id:"",
    line_manager_id:"",
    city:"",
    country:"",
    gender:"",
    emp_dept:"",
    password:"",
  }
  userExist=false;

  constructor( private http : HttpClient, private router : Router) { }

  @ViewChild('f') formData!:NgForm;

  submit(){
    this.userData.firstname=this.formData.value.firstname;
    this.userData.lastname=this.formData.value.lastname;
    this.userData.username=this.formData.value.username;
    this.userData.email=this.formData.value.email;
    this.userData.mobile=this.formData.value.mobile;
    this.userData.emp_code=this.formData.value.emp_code;
    this.userData.org_id=this.formData.value.org_id;
    this.userData.line_manager_id=this.formData.value.line_manager_id;
    this.userData.gender=this.formData.value.gender;
    this.userData.city=this.formData.value.city;
    this.userData.country=this.formData.value.country;
    this.userData.password=this.formData.value.password;
    this.userData.emp_dept=this.formData.value.emp_dept;
    console.log(this.userData);

    this.http.post('/register-user',this.userData).subscribe((result)=>{
      console.warn(result); 
      this.router.navigate(['/login'])
  },(error)=>{
    console.error(error);
    this.userExist=true;
  });
}

  ngOnInit(): void {
  }

}
