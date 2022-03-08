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
    user_id:"",
    org_id:""
  }

  sessionData:any;
  teamMembers:any;

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

  ngOnInit(): void {

    this.sessionData=JSON.parse(sessionStorage['userData'])[0];
    this.manager.line_manager_id=this.sessionData.line_manager_id;
    this.manager.org_id=this.sessionData.org_id;
    this.manager.user_id=this.sessionData.user_id;
    console.log(this.manager,12345678)
  
    // Get my team users
    this.http.post(`/api/v1/employee/getMyTeam`, this.manager, this.requestOptions).subscribe((response)=>{
      console.log(response);
      this.teamMembers=response;
      console.log("team_DATA:---", this.teamMembers)
      
    },(error)=>{
      console.error(error);
    })

  }

}
