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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      console.log(params);
      this.Id.goal_id=params["ID"];
      console.log(this.Id.goal_id);
      // this.org_id=sessionStorage['orgDetails.id'];
      // console.log(this.org_id)
    })    
    this.getGoalDetails()
    // console.log(this.userData); 

  }

  getGoalDetails(){
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
  return this.http.post(`/api/v1/employee/getgoaldetails`, this.Id, requestOptions).subscribe((response)=>{
    console.log(response);
    this.goal_data=response;
    console.log("goal_DATA:---", this.goal_data[0])
    
  },(error)=>{
    console.error(error);
  })

  }

}
