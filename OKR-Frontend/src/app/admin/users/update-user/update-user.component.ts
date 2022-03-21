import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit , Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/apiCollection/api.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  @Input() userDetails:any;
  userData: any;
  Id={
    user_id:""
  }

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
  allUsers: any;
    selectEvent() {}
    onChangeSearch(search: string) {}
    onFocused() {}
    selectEventCountry() {}
    onLocationSubmit() {}
    onCountryCleared() {}
    customFilter = function(countries: any[], query: string): any[] {
      return countries.filter(x => x.name.toLowerCase().startsWith(query.toLowerCase()));
    };

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

  updateForm = new FormGroup({
    first_name:new FormControl(''),
    last_name:new FormControl(''),
    username:new FormControl(''),
    email:new FormControl(''),
    emp_code:new FormControl(''),
    org_id:new FormControl(''),
    line_manager_id:new FormControl(''),
    city:new FormControl(''),
    country:new FormControl(''),
    department:new FormControl(''),
    password:new FormControl(''),
    conf_password:new FormControl('')
  })

  constructor( private http : HttpClient, private route :ActivatedRoute, private router: Router, private apiData:ApiService, private toastr: ToastrService) {
    this.apiData.getUsers().subscribe((result)=>{
      console.log(result);
      
      this.allUsers = result
    },(error)=>{
      console.error(error);
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
    console.log(this.model);
    
    this.route.queryParams.subscribe((params) => {
      this.Id.user_id = params['userid'];
      console.log(this.Id.user_id,"params");
    });
    this.http.post(`/api/v1/employee/getsingleuser`, this.Id, this.requestOptions).subscribe((response)=>{
      console.log(response);
      this.userData=response;
      this.userData=this.userData[0];
      console.log(this.userData)
      this.updateForm = new FormGroup({
        first_name:new FormControl(this.userData['first_name']),
        last_name:new FormControl(this.userData['last_name']),
        username:new FormControl(this.userData['username']),
        email:new FormControl(this.userData['email']),
        emp_code:new FormControl(this.userData['emp_code']),
        org_id:new FormControl(this.userData['org_id']),
        line_manager_id:new FormControl("1"),
        city:new FormControl(this.userData['city']),
        country:new FormControl(this.userData['country']),
        department:new FormControl(this.userData['department']),
        password:new FormControl(""),
        conf_password:new FormControl(""),
        // password:new FormControl(this.userData['password']),
      })
      console.log(this.updateForm.value,"abbbbc")
    },(error)=>{
      console.error(error);
    })
   
  }
  ownerChange(){
    console.log(this.model)
    this.updateForm = new FormGroup({
      first_name:new FormControl(this.userData['first_name']),
      last_name:new FormControl(this.userData['last_name']),
      username:new FormControl(this.userData['username']),
      email:new FormControl(this.userData['email']),
      emp_code:new FormControl(this.userData['emp_code']),
      org_id:new FormControl(this.userData['org_id']),
      line_manager_id:new FormControl(this.model.user_id),
      city:new FormControl(this.userData['city']),
      country:new FormControl(this.userData['country']),
      department:new FormControl(this.userData['department']),
      password:new FormControl(""),
      conf_password:new FormControl(""),
    })
  }

  

  updateUser(){
    console.log(this.model)
    this.http.post(`/api/v1/admin/update-user`, this.updateForm.value, this.requestOptions).subscribe((result)=>{
      console.log(result);
      this.toastr.success("Updated Successfully...", 'Success');
      this.router.navigate(['admin/users/']);
        // setTimeout(() => {
        // window.location.reload();
        // }, 1000);
    },(error)=>{
      console.error(error);
      this.toastr.error('Something went wrong!!!', 'Error!!!');
    });
  }

}
