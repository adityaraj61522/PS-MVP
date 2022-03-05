import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../apiCollection/api.service';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  allUsers:any = []

    countrykeyword = 'name';
    public countries = [
      
      { id: 1, name: 'Albania'},
      { id: 2, name: 'Belgium'},
      { id: 3, name: 'Denmark'},
      { id: 4, name: 'Georgia'},
      { id: 5, name: 'India'},
      { id: 6, name: 'Montenegro'},
      { id: 7, name: 'Macedonia'},
      { id: 8, name: 'Russia'},
      { id: 9, name: 'Slovenia'},
      { id: 10, name: 'Switzerland'},
      { id: 11, name: 'Turkey'},
      { id: 12, name: 'Ukraine'},
    ];
  model: any;
    selectEvent() {}
    onChangeSearch(search: string) {}
    onFocused() {}
    selectEventCountry() {}
    onLocationSubmit() {}
    onCountryCleared() {}
    customFilter = function(countries: any[], query: string): any[] {
      return countries.filter(x => x.name.toLowerCase().startsWith(query.toLowerCase()));
    };

  userData={
    first_name:"",
    last_name:"",
    username:"",
    email:"",
    //mobile:"",
    emp_code:"",
    //org_id:"",
    line_manager_id:"",
    city:"",
    country:"",
    //gender:"",
    department:"",
    password:"",
    //conf_password:""
  }
  userExist=false;
  pwd_matched=true;
  conf_password: any;

  registerForm!: FormGroup;

  constructor( 
    private http : HttpClient, 
    private router : Router, 
    private fb : FormBuilder,
    private apiData: ApiService) { 
      this.apiData.getUsers().subscribe((result)=>{
        this.allUsers = result
      }, (error)=>{
        console.error(error);
      });
    }

  @ViewChild('f') formData!:NgForm;

  submit(){
    this.userData.first_name=this.formData.value.first_name;
    this.userData.last_name=this.formData.value.last_name;
    this.userData.username=this.formData.value.username;
    this.userData.email=this.formData.value.email;
    //this.userData.mobile=this.formData.value.mobile;
    this.userData.emp_code=this.formData.value.emp_code;
    //this.userData.org_id=this.formData.value.org_id;
    this.userData.line_manager_id=this.model.user_id;
    //this.userData.gender=this.formData.value.gender;
    this.userData.city=this.formData.value.city;
    this.userData.country=this.formData.value.country.name;
    this.userData.password=this.formData.value.password;
    this.userData.department=this.formData.value.department;
    this.conf_password=this.formData.value.conf_password;
    //console.log(this.userData);
    if(this.userData.password!==this.conf_password){
      //console.log("Password Not Matched", this.userData.password , this.conf_password)
      this.pwd_matched=false;
      throw Error ("Password Not Matched");
    }

    this.http.post(`http://localhost:9001/register-user`,this.userData).subscribe((result)=>{
      console.warn(result); 
      this.router.navigate(
        ['/login']
        );
  },(error)=>{
    console.error(error);
    this.userExist=true;
  });
}


inFormatter = (x: {full_name: string}) => x.full_name;
outFormatter = (x: {full_name: string}) => x.full_name; 

  search: OperatorFunction<string, readonly string[]> = (text$: 
    Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.allUsers.filter((v: any) => v.full_name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
    )

  ngOnInit(): void {
    this.registerForm = this.fb.group({
    first_name: ["", Validators.required],
    last_name: ["", Validators.required],
    username: ["", [Validators.required, Validators.email]],
    email: ["", [Validators.required, Validators.email]],
    emp_code: ["", Validators.required],
    line_manager_id: ["", Validators.required],
    city: ["", Validators.required],
    country: ["", Validators.required],
    department: ["", Validators.required],
    password: ["", Validators.required],
    conf_password: ["", Validators.required],

    })
  }

}
