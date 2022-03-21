import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../apiCollection/api.service';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';



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
    emp_code:"",
    org_id:"",
    line_manager_id:"",
    city:"",
    country:"",
    department:"",
    password:"",
  }
  userExist=false;
  pwd_matched=true;
  conf_password: any;

  registerForm!: FormGroup;

  actionType:any;

  constructor( 
    private http : HttpClient, 
    private router : Router, 
    private fb : FormBuilder,
    private apiData: ApiService,
    private route : ActivatedRoute, private toastr: ToastrService) { }

  @ViewChild('f') formData!:NgForm;


  headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'x-access-token' : JSON.parse(JSON.stringify(sessionStorage.getItem("token"))),
    'x-key':JSON.parse(JSON.stringify(sessionStorage.getItem("user_id"))),
    'x-org':JSON.parse(JSON.stringify(sessionStorage.getItem("orgDetails_id")))
  }  
  requestOptions = { 
    headers: new HttpHeaders(this.headers),
  };


  submit(){
    this.userData.first_name=this.formData.value.first_name;
    this.userData.last_name=this.formData.value.last_name;
    this.userData.username=this.formData.value.username;
    this.userData.email=this.formData.value.email;
    this.userData.emp_code=this.formData.value.emp_code;
    this.userData.line_manager_id=this.model.user_id;
    this.userData.city=this.formData.value.city;
    this.userData.country=this.formData.value.country.name;
    this.userData.password=this.formData.value.password;
    this.userData.department=this.formData.value.department;
    this.conf_password=this.formData.value.conf_password;
    if(this.userData.password!==this.conf_password){
      this.pwd_matched=false;
      throw Error ("Password Not Matched");
    }

    if(this.actionType=="addUser"){
      this.http.post(`api/v1/admin/add-user`,this.userData, this.requestOptions).subscribe((result)=>{
        console.warn(result); 
        this.router.navigate(
          ['/admin/users']
          );
    this.toastr.success('User Added Successfully.....', 'Success');
    },(error)=>{
      console.error(error);
      if(error.status==300){
        this.userExist=true;
        this.toastr.error('User Already Exist!!!', 'Error!!!');
      }else{
        this.toastr.error('Something went wrong!!!', 'Error!!!');
      }
    });

    }else if(this.actionType=="admin_update"){
      this.http.post(`api/v1/admin/update-user`,this.userData, this.requestOptions).subscribe((result)=>{
        console.warn(result); 
        this.router.navigate(
          ['/admin/users']
          );
    this.toastr.success('User Added Successfully.....', 'Success');
    },(error)=>{
      console.error(error);
      if(error.status==300){
        this.userExist=true;
        this.toastr.error('User Already Exist!!!', 'Error!!!');
      }else{
        this.toastr.error('Something went wrong!!!', 'Error!!!');
      }
    });

    }else{
    this.http.post(`http://localhost:9001/register-user`,this.userData).subscribe((result)=>{
      console.warn(result); 
      this.toastr.success('Registered Successfully.....', 'Success');
      this.router.navigate(
        ['/login']
        );
  },(error)=>{
    console.error(error);
    if(error.status==300){
      this.userExist=true;
      this.toastr.error('User Already Exist!!!', 'Error!!!');
    }else{
      this.toastr.error('Something went wrong!!!', 'Error!!!');
    }
  });
}
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

    this.userData.org_id=JSON.parse(JSON.stringify(sessionStorage.getItem('orgDetails_id')));
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

    this.route.queryParams.subscribe((params) => {
      this.actionType = params['action'];
      console.log(this.actionType,"params");
    });
    console.log("aldjhfahsjlgf")
    this.apiData.getUsers().subscribe((result)=>{
        console.log("USERS:==", result)
        this.allUsers = result
      }, (error)=>{
        console.error(error);
      });
  }

}
