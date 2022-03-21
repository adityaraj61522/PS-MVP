import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit , Input} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
 
  model: any;
  allUsers: any;
  isload=false;

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
    department:new FormControl(''),
    line_manager_data:new FormControl({})
  })
  
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private http : HttpClient, private route :ActivatedRoute, private router: Router, private apiData:ApiService, private toastr: ToastrService) {
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
    
    this.myForm = this.fb.group({
      first_name:new FormControl(this.userDetails['first_name']),
      last_name:new FormControl(this.userDetails['last_name']),
      username:new FormControl(this.userDetails['username']),
      email:new FormControl(this.userDetails['email']),
      emp_code:new FormControl(this.userDetails['emp_code']),
      org_id:new FormControl(this.userDetails['org_id']),
      line_manager_id:new FormControl(JSON.stringify(this.userDetails['line_manager_id'])),
      city:new FormControl(this.userDetails['city']),
      department:new FormControl(this.userDetails['department']),
      line_manager_data:{}
    })
  }

  

  updateUser(myForm:any){

    var postReq:any = {
      first_name: myForm.value.first_name,
      last_name : myForm.value.last_name,
      username : myForm.value.username,
      email : myForm.value.email,
      emp_code : myForm.value.emp_code,
      org_id: myForm.value.org_id,
      line_manager_id: myForm.value.line_manager_id,
      department: myForm.value.department,
      city : myForm.value.city,
      user_id:this.userDetails.user_id
   
      };
    this.http.put(`/api/v1/admin/update-user`, postReq, this.requestOptions).subscribe((result)=>{
      console.log(result);
      this.toastr.success("Updated Successfully...", 'Success');
      this.isload=true;
        setTimeout(() => {
        window.location.reload();
        }, 500);
    },(error)=>{
      this.isload=false;
      console.error(error);
      this.toastr.error('Something went wrong!!!', 'Error!!!');
    });
  }

}
