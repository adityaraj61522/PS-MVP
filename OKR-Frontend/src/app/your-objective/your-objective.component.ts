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
  OwnerDetailsSearchInput = new FormControl;
  searchOwner= new BehaviorSubject<string>('');
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
      'x-key':'1',
      'x-org':'1'
    });


    const cloneReq = req.clone({headers});

    return next.handle(cloneReq);
  }

  constructor( private http : HttpClient) { }

  // owners : Observable<string[]>= this.searchOwner.pipe(
  //   switchMap(search=>{
  //     const headers = {
  //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //       'Accept': 'application/json',
  //       'Access-Control-Allow-Headers': '*',
  //       'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
  //       'x-key':'1',
  //       'x-org':'1'
  //     }
  //     const requestOptions = {
  //       headers: new HttpHeaders(headers),
  //     };
  //     return this.http.post(`/api/v1/employee/getusers?namelike=`+search, this.getUser, requestOptions).subscribe((response)=>{
  //       console.log(response,"user");
  //       this.allUsers=response;
  //     },(error)=>{
  //       console.error(error);
  //     })
  //   })
  // )

  doOwnerSearch(){
    this.searchOwner.next(this.OwnerDetailsSearchInput.value); 
  }

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
  newObjective={
    goal_name: "",
    goal_description: "",
    goal_start_date: "",
    goal_due_date: "",
    goal_owner_name: "",
    linked_org_goal_id: "",
    org_id:"",
    goal_owner_id:1,
    goal_owner_email:"",
    goal_type:"",
    goal_setting_id:1,
    created_by:'',
    updated_by:1


  }

  newKey={
    milestone_name:"",
    milestone_type:"",
    milestone_start_date:"",
    milestone_due_date:""
  }

  @ViewChild('ObjForm') ObjFormData!: NgForm;
  @ViewChild('KeyForm') KeyResFormData!: NgForm;
  

  addKey(){
    this.newKey.milestone_name=this.KeyResFormData.value.milestone_name;
    this.newKey.milestone_type=this.KeyResFormData.value.milestone_type;
    this.newKey.milestone_start_date=this.KeyResFormData.value.milestone_start_date;
    this.newKey.milestone_due_date=this.KeyResFormData.value.milestone_due_date;
    console.log(this.newKey);
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
  userData:any;

  allUsers:any;
  goalData: any;
  async ngOnInit(): Promise<void> {
    this.userdata.token=JSON.parse(JSON.stringify(sessionStorage.getItem("token")));
    this.userdata.expires=JSON.parse(JSON.stringify(sessionStorage.getItem("expires")));
    this.userdata.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    console.log(this.userdata.user[0],"kjhskjkj");
    this.userData=this.userdata.user[0]
    console.log(this.userData.first_name);
    this.newObjective.org_id=this.userData.org_id;
    // this.newObjective.goal_owner_id=this.userData.first_name;
    // this.newObjective.goal_owner_email=this.userData.first_name;
    // this.newObjective.goal_setting_id=this.userData.first_name;
    this.newObjective.created_by=this.userData.user_id;
    // this.newObjective.updated_by=this.userData.first_name;
    // console.log(this.headers)

    this.getGoal.org_id=this.userData.org_id;
    this.getGoal.goal_owner_id=this.userData.user_id;


    this.getUser.org_id=this.userData.org_id;
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
    

    // Get Goals
    this.http.post(`/api/v1/employee/getgoals`, this.getGoal, requestOptions).subscribe((response)=>{
      console.log(response);
      this.goalData=response;
      console.log("goal_DATA:---", this.goalData)
      
    },(error)=>{
      console.error(error);
    })

    // Get Users
     await this.http.post(`/api/v1/employee/getusers`, this.getUser, requestOptions).subscribe((response)=>{
      console.log(response,"user");
      this.allUsers=response;
    },(error)=>{
      console.error(error);
    })

    console.log(this.allUsers,"all")
  }

  addObjective(){
    this.newObjective.goal_name=this.ObjFormData.value.goal_name;
    this.newObjective.goal_type=this.ObjFormData.value.goal_type;
    this.newObjective.goal_start_date=this.ObjFormData.value.goal_start_date;
    this.newObjective.goal_due_date=this.ObjFormData.value.goal_due_date;
    this.newObjective.goal_owner_name=this.ObjFormData.value.goal_owner_name;
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
      this.show=false;
      this.show2=true;
    },(error)=>{
      console.error(error);
    });
    console.log(this.newObjective ,"obj")
  }


  updateObjective(){
      
  }
}
