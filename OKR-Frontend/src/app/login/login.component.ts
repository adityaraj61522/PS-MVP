import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router:Router, private http : HttpClient, private route : ActivatedRoute) { }

  loginData={
    username:"",
    password:"",
    orgId:1
  };

  correctPassword=true;

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
      console.log(result); 
      this.responseData=JSON.parse(JSON.stringify(result));
      sessionStorage.setItem("token" , this.responseData.token);
      sessionStorage.setItem("expires" , this.responseData.expires);
      sessionStorage.setItem("userData" , this.responseData.user);
      this.correctPassword=true;
      this.router.navigate(
        ['/objectives']
      );
    },(error)=>{
      console.error(error);
      this.correctPassword=false;
    });
    console.log(sessionStorage)
  }
  url={
    org_url:""
  }

  ngOnInit(): void {
    this.url.org_url=window.location.href;
    console.log(this.url);
    this.http.post(`http://localhost:9001/organization-details`,this.url).subscribe((result)=>{
      console.log(result);
    },(error)=>{
      console.error(error);
    });

  }

}
