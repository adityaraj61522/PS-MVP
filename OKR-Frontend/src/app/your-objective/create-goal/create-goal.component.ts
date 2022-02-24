import { HttpClientModule, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgStyle } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable,BehaviorSubject, OperatorFunction } from 'rxjs';
import { debounceTime,switchMap, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent implements OnInit {
  model: any;

  constructor( private http : HttpClient ) { }

  newObjective={
    goal_name: "",
    goal_description: "",
    goal_start_date: "",
    goal_due_date: "",
    goal_owner_name: "",
    linked_org_goal_id: "",
    org_id:"",
    goal_owner_id:"",
    goal_owner_email:"",
    goal_type:"",
    goal_setting_id:1,
    created_by:'',
    updated_by:1
  }

  @ViewChild('ObjForm') ObjFormData!: NgForm;

  user="";
  userData:any;
  
  getUser={
    org_id:""
  }
  allUsers:any;

  async ngOnInit(): Promise<void> {
    this.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    // console.log(this.userdata.user[0],"kjhskjkj");
    this.userData=this.user[0]
    // console.log(this.userData.first_name);
    this.newObjective.org_id=this.userData.org_id;
    // this.newObjective.goal_setting_id=this.userData.first_name;
    this.newObjective.created_by=this.userData.user_id;
    // this.newObjective.updated_by=this.userData.first_name;
    this.getUser.org_id=this.userData.org_id;
    console.log(this.getUser, "jhvjhcds")

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
      'x-key':'1',
      'x-org':'1'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };

    // Get Users
     await this.http.post(`/api/v1/employee/getusers`, this.getUser, requestOptions).subscribe((response)=>{
      console.log(response,"user");
      this.allUsers=response;
      console.log(this.allUsers[0],"al")
    },(error)=>{
      console.error(error);
    })

  }

inFormatter = (x: {full_name: string}) => x.full_name;
outFormatter = (x: {full_name: string}) => x.full_name;

  d=["abc","abcc","abcd","abcde","abcssss","abcddd"]

  search: OperatorFunction<string, readonly string[]> = (text$: 
    Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.allUsers.filter((v: any) => v.full_name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
    )
    

  addObjective(){
    this.newObjective.goal_name=this.ObjFormData.value.goal_name;
    this.newObjective.goal_type=this.ObjFormData.value.goal_type;
    this.newObjective.goal_start_date=this.ObjFormData.value.goal_start_date;
    this.newObjective.goal_due_date=this.ObjFormData.value.goal_due_date;
    this.newObjective.goal_owner_name=this.model.full_name;
    this.newObjective.goal_owner_id=this.model.user_id;
    this.newObjective.goal_owner_email=this.model.email;
    this.newObjective.linked_org_goal_id=this.ObjFormData.value.linked_org_goal_id;
    // this.show=false;
    // this.show2=true;
    const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
    'x-key':'1',
    'x-org':'1'
  }
  const requestOptions = {
    headers: new HttpHeaders(headers),
  };
    
    this.http.post(`/api/v1/employee/create-objective`, this.newObjective , requestOptions
  ).subscribe((result)=>{
      console.log(result); 
      // this.show=false;
      // this.show2=true;
    },(error)=>{
      console.error(error);
    });
    console.log(this.newObjective ,"obj")
  }


}
