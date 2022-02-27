import { HttpClientModule, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgStyle } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable,BehaviorSubject, OperatorFunction } from 'rxjs';
import { debounceTime,switchMap, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-your-objective',
  templateUrl: './your-objective.component.html',
  styleUrls: ['./your-objective.component.css']
})
export class YourObjectiveComponent implements OnInit {
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
    'x-key':'1',
    'x-org':'1'
  }  
  requestOptions = {
    headers: new HttpHeaders(this.headers),
  };
  constructor( private http : HttpClient) { }
  show=false;
  show2=false;
  show3=false;
  dp=false;
  showDp(){
    if(this.dp == false){
      this.dp=true;
    }else{
      this.dp =false;
    }
  }
  openUpdateDp(){
    this.show3=true;
  }
  objectiveShow(){
    this.show=true;
  }

  objectiveHide(){
    this.show=false;
  }

  keyresultHide(){
    this.show2=false;
  }
  previous(){
    this.show2=false;
    this.show=true;
  }
  deleteGoalReq={
    goal_id:"",
    org_id:"",
  }

  getGoal={
    org_id:"",
    goal_owner_id:""
  }

  getUser={
    org_id:""
  }
  userdata={
    token:"",
    expires:"",
    user:""
  }

  deleteGoal=(goal_name: any, goal_id:any , org_id: any)=>{
    this.deleteGoalReq.goal_id= goal_id;
    this.deleteGoalReq.org_id = org_id;
    console.log(this.deleteGoalReq)
    if(confirm("Are you sure want to delete "+goal_name)){
      this.http.put(`/api/v1/employee/deletegoal`, {goal_id,org_id} , this.requestOptions).subscribe((response)=>{
        console.log("delete goal console:---", response);
        window.location.reload();
      },(error)=>{
        console.error(error);
      })
    }
  }
  userData:any;
  allUsers:any;
  goalData: any;
  async ngOnInit(): Promise<void> {
    this.userdata.token=JSON.parse(JSON.stringify(sessionStorage.getItem("token")));
    this.userdata.expires=JSON.parse(JSON.stringify(sessionStorage.getItem("expires")));
    this.userdata.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    this.userData=this.userdata.user[0]
    // console.log(this.headers)

    this.getGoal.org_id=this.userData.org_id;
    this.getGoal.goal_owner_id=this.userData.user_id;


    this.getUser.org_id=this.userData.org_id;
    // Get Goals
    this.http.post(`/api/v1/employee/getgoals`, this.getGoal, this.requestOptions).subscribe((response)=>{
      // console.log(response);
      this.goalData=response;
      
      console.log("goal_DATA:---", this.goalData)
      
    },(error)=>{
      console.error(error);
    })

    // Get Users
    //  await this.http.post(`/api/v1/employee/getusers`, this.getUser, requestOptions).subscribe((response)=>{
    //   console.log(response,"user");
    //   this.allUsers=response;
    // },(error)=>{
    //   console.error(error);
    // })

    // console.log(this.allUsers,"all")

    // Create-goal content
    this.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    // console.log(this.userdata.user[0],"kjhskjkj");
    this.userData=this.user[0]
    this.newObjective.org_id=this.userData.org_id;
    // this.newObjective.goal_setting_id=this.userData.first_name;
    this.newObjective.created_by=this.userData.user_id;
    // this.newObjective.updated_by=this.userData.first_name;
    this.getUser.org_id=this.userData.org_id;
    console.log(this.getUser, "jhvjhcds")

    // Get Users
     await this.http.post(`/api/v1/employee/getusers`, this.getUser, this.requestOptions).subscribe((response)=>{
      console.log(response,"user");
      this.allUsers=response;
      console.log(this.allUsers[0],"al")
    },(error)=>{
      console.error(error);
    })

    // Get Orginizational goal
    await this.http.post(`/api/v1/employee/getorganizationgoals`, this.getUser, this.requestOptions).subscribe((response)=>{
      console.log(response,"user");
      this.allOrgGoal=response;
      console.log(this.allOrgGoal,"or")
    },(error)=>{
      console.error(error);
    })
  }

  // create Objective content

  model: any;
  modelOrgGoal:any;

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
    // goal_type:"",
    goal_setting_id:1,
    created_by:'',
    updated_by:1
  }

  @ViewChild('ObjForm') ObjFormData!: NgForm;

  user="";
  allOrgGoal:any;

inFormatter = (x: {goal_name: string}) => x.goal_name;
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

  searchOrgGoal: OperatorFunction<string, readonly string[]> = (text$: 
      Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term.length < 1 ? []
          : this.allOrgGoal.filter((v: any) => v.goal_name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
      )


    

  addObjective(){
    this.newObjective.goal_name=this.ObjFormData.value.goal_name;
    // this.newObjective.goal_type=this.ObjFormData.value.goal_type;
    this.newObjective.goal_start_date=this.ObjFormData.value.goal_start_date;
    this.newObjective.goal_due_date=this.ObjFormData.value.goal_due_date;
    this.newObjective.goal_owner_name=this.model.full_name;
    this.newObjective.goal_owner_id=this.model.user_id;
    this.newObjective.goal_owner_email=this.model.email;
    this.newObjective.linked_org_goal_id=this.ObjFormData.value.linked_org_goal_id;
    this.show=false;
    this.show2=true;
    
    this.http.post(`/api/v1/employee/create-objective`, this.newObjective , this.requestOptions
  ).subscribe((result)=>{
      console.log(result); 
      this.show=false;
      this.show2=true;
    },(error)=>{
      console.error(error);
    });
    console.log(this.newObjective ,"obj")
  }
  
}
