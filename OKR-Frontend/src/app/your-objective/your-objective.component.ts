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
  async ngOnInit(): Promise<void> {
    this.userdata.token=JSON.parse(JSON.stringify(sessionStorage.getItem("token")));
    this.userdata.expires=JSON.parse(JSON.stringify(sessionStorage.getItem("expires")));
    this.userdata.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    this.userData=this.userdata.user[0]
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
  }
  updateObjective(){
      
  }
}
