import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {

  constructor(private http:HttpClient) { }

  manager={
    line_manager_id:"",
    org_id:""
  }

  sessionData:any;
  teamMembers:any;

  ngOnInit(): void {

    this.sessionData=JSON.parse(sessionStorage['userData'])[0];
    this.manager.line_manager_id=this.sessionData.line_manager_id;
    this.manager.org_id=this.sessionData.org_id;
    console.log(this.manager,12345678)
    
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
    this.http.post(`/api/v1/employee/getMyTeam`, this.manager, requestOptions).subscribe((response)=>{
      console.log(response);
      this.teamMembers=response;
      console.log("team_DATA:---", this.teamMembers)
      
    },(error)=>{
      console.error(error);
    })

  }

}
