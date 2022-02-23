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

    countrykeyword = 'name';
    public countries = [
      { id: 1, name: 'India'},
      { id: 2, name: 'Russia'},
      { id: 3, name: 'Denmark'},
      { id: 4, name: 'Montenegro'},
      { id: 5, name: 'Turkey'},
      { id: 6, name: 'Ukraine'},
      { id: 7, name: 'Macedonia'},
      { id: 8, name: 'Slovenia'},
      { id: 9, name: 'Georgia'},
      { id: 10, name: 'Albania'},
      { id: 11, name: 'Belgium'},
      { id: 12, name: 'Switzerland'}
    ];
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
    org_id:"",
    line_manager_id:"",
    city:"",
    country:"",
    //gender:"",
    department:"",
    password:"",
  }
  userExist=false;

  constructor( private http : HttpClient, private router : Router) { }

  @ViewChild('f') formData!:NgForm;

  submit(){
    this.userData.first_name=this.formData.value.first_name;
    this.userData.last_name=this.formData.value.last_name;
    this.userData.username=this.formData.value.username;
    this.userData.email=this.formData.value.email;
    //this.userData.mobile=this.formData.value.mobile;
    this.userData.emp_code=this.formData.value.emp_code;
    this.userData.org_id=this.formData.value.org_id;
    this.userData.line_manager_id=this.formData.value.line_manager_id;
    //this.userData.gender=this.formData.value.gender;
    this.userData.city=this.formData.value.city;
    this.userData.country=this.formData.value.country;
    this.userData.password=this.formData.value.password;
    this.userData.department=this.formData.value.department;
    console.log(this.userData);

    this.http.post(`http://localhost:9001/register-user`,this.userData).subscribe((result)=>{
      console.log(result); 
      //this.router.navigate([`./login`])
  },(error)=>{
    console.error(error);
    this.userExist=true;
  });
}

  ngOnInit(): void {
  }

}
