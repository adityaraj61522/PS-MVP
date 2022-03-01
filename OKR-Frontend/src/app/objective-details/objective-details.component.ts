import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-objective-details',
  templateUrl: './objective-details.component.html',
  styleUrls: ['./objective-details.component.css']
})
export class ObjectiveDetailsComponent implements OnInit {

  constructor(private http : HttpClient, private route : ActivatedRoute) { }

  Id={
    goal_id:""
  }
  org_id:any;
  goal_data:any;
  milestone_data:any;

  deleteMilestoneReq={ 
    milestone_id:"",
    org_id:"",
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
    'x-key':'1',
    'x-org':'1'
    // 'x-access-token' : JSON.parse(JSON.stringify(sessionStorage.getItem("token"))),
    // 'x-key':JSON.parse(JSON.stringify(sessionStorage.getItem("user_id"))),
    // 'x-org':JSON.parse(JSON.stringify(sessionStorage.getItem("orgDetails_id")))
  }  
  requestOptions = { 
    headers: new HttpHeaders(this.headers),
  };

  deleteMilestone=(milestone_name: any, milestone_id:any , org_id: any)=>{
    
    this.deleteMilestoneReq.milestone_id= milestone_id;
    this.deleteMilestoneReq.org_id = org_id;
    console.log(this.deleteMilestoneReq)
    if(confirm("Are you sure want to delete "+milestone_name)){
      this.http.put(`/api/v1/employee/deletemilestone`, {milestone_id,org_id} , this.requestOptions).subscribe((response)=>{
        console.log("delete goal console:---", response);
        window.location.reload();
      },(error)=>{
        console.error(error);
      })
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
    
      this.Id.goal_id=params["ID"];
     
      //  const myorgid = sessionStorage.getItem('orgDetails_id');
      // console.log(myorgid)
    })    
    this.getGoalDetails();
    this.getGoalMilestones();
   

  }

  getGoalDetails(){
  // Get Goals

  
  return this.http.post(`/api/v1/employee/getgoaldetails`, this.Id, this.requestOptions).subscribe((response)=>{
   
    this.goal_data=response;
    console.log(this.goal_data);
    
   
    
  },(error)=>{
    console.error(error);
  })

  }

  getGoalMilestones(){

  // Get Goals
  return this.http.post(`/api/v1/employee/getgoalmilestones`, this.Id, this.requestOptions).subscribe((response)=>{
   
    this.milestone_data=response;
  
    
  },(error)=>{
    console.error(error);
  })

  }

}
