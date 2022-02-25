import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  @Input() teamMemberDetails:any;

  constructor( private http : HttpClient ) { }

  goalShow=false;
  showGoal(){
    if(this.goalShow==false){
      this.goalShow=true;
    }else{
    this.goalShow=false;
    }
  }

  getGoal={
    org_id:"",
    goal_owner_id:""
  };
  goalData:any;

  ngOnInit(): void {
    this.getGoal.org_id=this.teamMemberDetails.org_id;
    this.getGoal.goal_owner_id=this.teamMemberDetails.user_id;
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
      console.log("goal_DATA list:---", this.goalData)
      
    },(error)=>{
      console.error(error);
    })
  }

}
