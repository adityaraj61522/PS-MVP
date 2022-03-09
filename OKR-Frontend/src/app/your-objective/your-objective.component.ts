import { HttpClientModule, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgStyle } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable,BehaviorSubject, OperatorFunction } from 'rxjs';
import { debounceTime,switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import { ApiService } from '../apiCollection/api.service';
import { ToastrService } from 'ngx-toastr';

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
    // 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
    // 'x-key':'1',
    // 'x-org':'1'
    'x-access-token' : JSON.parse(JSON.stringify(sessionStorage.getItem("token"))),
    'x-key':JSON.parse(JSON.stringify(sessionStorage.getItem("user_id"))),
    'x-org':JSON.parse(JSON.stringify(sessionStorage.getItem("orgDetails_id")))
  }  
  requestOptions = {
    headers: new HttpHeaders(this.headers),
  };
  constructor( private http : HttpClient , private toastr: ToastrService) { }

  @ViewChild('ObjForm') ObjFormData!: NgForm;
  isLoad = false
  show=false;
  show2=false;
  show3=false;
  dp=false;
  er=false;
  user_id:any;
  deleteGoalReq={
    goal_id:"",
    org_id:"",
  }
  sendForClosureReq ={
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
  active:any;
  rejected:any;
  closed:any;
  userdata={
    token:"",
    expires:"",
    user:""
  }
  goal_limit_exceeded=false;
  userData:any;
  allUsers:any;
  goalData: any;
  goalCountData: any;
goalSettings:any;
  todayDate = new Date().toISOString().split("T")[0];

  model: any;
  modelOrgGoal:any;

  date_limit:any;

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
  user="";
  allOrgGoal:any;
  startDate:any;
  endDate:any;

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


  // show goal & milestone
  objectiveShow(){
    this.show=true;
  } 

  objectiveHide(){
    this.show = false
  }

  keyresultshow(){
    this.show2=true;
  }
  keyresultHide(){
    this.show2=false;
  }

 
  showSuccess() {
    this.toastr.success("Successfully Created...", 'Created');
  }
  showSuccessDeleteGoal() {
    this.toastr.success("Goal Deleted Successfully...", 'Deleted');
  }
  showSuccessCloseGoal() {
    this.toastr.success("Goal sent for Closure Successfully...", 'Success');
  }
  showError() {
    this.toastr.error('Something went wrong!!!', 'Error!!!');
  }

 // Delete Goal fucntionality
  deleteGoal=(goal_name: any, goal_id:any , org_id: any, todo: any)=>{
    this.deleteGoalReq.goal_id= goal_id;
    this.deleteGoalReq.org_id = org_id;
    // console.log(this.deleteGoalReq)
    if(todo=='DELETE'){
      if(confirm("Are you sure want to delete "+goal_name)){
        this.http.put(`/api/v1/employee/deletegoal`, {goal_id,org_id} , this.requestOptions).subscribe((response)=>{
          this.showSuccessDeleteGoal();
          this.ngOnInit();
        },(error)=>{
          this.showError()
       })
      }
    }
    if(todo=='CLOSURE'){
      if(confirm("Are you sure want to close goal "+ goal_name)){
        console.log(goal_name , goal_id, org_id, todo);
        this.http.put(`api/v1/employee/closegoal`, {goal_id, org_id}, this.requestOptions).subscribe((response)=>{
        console.log("delete goal console:---", response);
        //Toaster
        this.showSuccessCloseGoal();
        this.ngOnInit();
        },(error)=>{
          this.showError()
       })
      }
    }
  }
// create Objective content
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

      selectQuater(){
        if(this.ObjFormData.value.goal_quater=="1"){
          this.startDate="01/01/2022";
          this.endDate="31/03/2022";
        }else if(this.ObjFormData.value.goal_quater=="2"){
          this.startDate="01/04/2022";
          this.endDate="31/06/2022";
        }else if(this.ObjFormData.value.goal_quater=="3"){
          this.startDate="01/07/2022";
          this.endDate="31/09/22";
        }else if(this.ObjFormData.value.goal_quater=="4"){
          this.startDate="01/10/2022"
          this.endDate="31/12/2022"
        }
        this.newObjective.goal_start_date=this.startDate;
        this.newObjective.goal_due_date=this.endDate;
      }
      selectHalfYear(){
        if(this.ObjFormData.value.goal_quater=="1"){
          this.startDate="01/01/2022";
          this.endDate="31/06/2022";
        }else if(this.ObjFormData.value.goal_quater=="2"){
          this.startDate="01/07/2022";
          this.endDate="31/012/2022";
        }
        this.newObjective.goal_start_date=this.ObjFormData.value.goal_start_date;
        this.newObjective.goal_due_date=this.ObjFormData.value.goal_due_date;
      }

  addObjective(){
    this.isLoad = true;
    this.newObjective.goal_name=this.ObjFormData.value.goal_name;
    this.newObjective.goal_start_date=this.ObjFormData.value.goal_start_date;
    this.newObjective.goal_due_date=this.ObjFormData.value.goal_due_date;
    this.newObjective.goal_owner_name=this.model.full_name;
    this.newObjective.goal_owner_id=this.model.user_id;
    this.newObjective.goal_owner_email=this.model.email;
    this.newObjective.linked_org_goal_id=this.ObjFormData.value.linked_org_goal_id;
    
    if(this.goalSettings.max_goals<this.model.goal_assigned){
      this.goal_limit_exceeded=true;
      this.isLoad=false;
    }else{
    this.http.post(`/api/v1/employee/create-objective`, this.newObjective , this.requestOptions).subscribe((result:any)=>{
      // console.log(result:any); 
      console.log(result);
      this.isLoad = false;
      this.show=false;
      this.show2=true;
      this.showSuccess();
      this.ngOnInit();
      sessionStorage.setItem("goalId",result.goalId);
    },(error)=>{
      console.error(error);
      this.showError();
      this.isLoad = false;
      this.er=true;
    });
  }
    // console.log(JSON.stringify(this.newObjective ),"obj")
  }

  session:any;
  async ngOnInit(): Promise<void> {
    console.log(this.todayDate,"dates");
    this.userdata.token=JSON.parse(JSON.stringify(sessionStorage.getItem("token")));
    this.userdata.expires=JSON.parse(JSON.stringify(sessionStorage.getItem("expires")));
    this.userdata.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    this.userData=this.userdata.user[0]

    this.getGoal.org_id=this.userData.org_id;
    this.getGoal.goal_owner_id=this.userData.user_id;
    this.getUser.org_id=this.userData.org_id;
    // Get Goals
    this.http
      .post(`/api/v1/employee/getgoals`, this.getGoal, this.requestOptions)
      .subscribe(
        (response) => {
          this.goalData = Object.values(response)[0];
          this.goalCountData = Object.values(response)[1];
        },
        (error) => {
          console.error(error);
        }
      );


    // Create-goal content
    this.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    this.userData=this.user[0]
    this.newObjective.org_id=this.userData.org_id;
    // this.newObjective.goal_setting_id=this.userData.first_name;
    this.newObjective.created_by=this.userData.user_id;
    this.getUser.org_id=this.userData.org_id;
  
    this.user_id=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))))[0].user_id
    sessionStorage.setItem("user_id",this.user_id);

    // Get Users
     await this.http.post(`/api/v1/employee/getusers`, this.getUser, this.requestOptions).subscribe((response)=>{

      this.allUsers=response;

    },(error)=>{
      console.error(error);
    })

    // Get Orginizational goal
    await this.http.post(`/api/v1/employee/getorganizationgoals`, this.getUser, this.requestOptions).subscribe((response)=>{
      
      this.allOrgGoal=response;
      console.log("Org goals:---",this.allOrgGoal);

    },(error)=>{
      console.error(error);
    })
  

  // Get goal settings
  this.http.post(`/api/v1/admin/getGoalSettings`, this.getUser , this.requestOptions
  ).subscribe((result:any)=>{
      this.goalSettings=JSON.stringify(result[0]);
      sessionStorage.setItem("goalSettings" , this.goalSettings);
      this.goalSettings=sessionStorage.getItem("goalSettings");
      this.goalSettings=JSON.parse(this.goalSettings);
    },(error)=>{
      console.error(error);

    });

    // if(this.goalSettings.goal_frequency=='QUATERLY'){
    //   this.startDate="1/2/22"
    //   this.endDate="1/3/22"
    // }
  }

  
  
}
