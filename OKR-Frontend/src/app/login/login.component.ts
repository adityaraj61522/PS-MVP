import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router:Router, private http : HttpClient) { }

  loginData={
    username:"",
    password:"",
    orgId:1
  };

  @ViewChild('f') loginFormData!:NgForm;

  register(){
    this.router.navigate(['/register']);
  }
  responseData:any;

  login(){
    this.loginData.username=this.loginFormData.value.email;
    // this.loginData.password=this.loginFormData.value.password;
    this.loginData.password=btoa(this.loginFormData.value.password);
    console.log(this.loginData);

    this.http.post(`http://localhost:9001/login`,this.loginData).subscribe((result)=>{
      // console.log(result); 
      // console.warn(JSON.stringify(result)); 
      this.responseData=JSON.parse(JSON.stringify(result));
      sessionStorage.setItem("token" , this.responseData.token);
      sessionStorage.setItem("expires" , this.responseData.expires);
      sessionStorage.setItem("userData" , this.responseData.user);
      this.router.navigate(
        ['/objectives']
      );
    },(error)=>{
      console.error(error);
      // this.correctPassword=false;
    });
      
    // this.router.navigate(['/objectives']);
    console.log(sessionStorage)
  }

  ngOnInit(): void {
  }

}
