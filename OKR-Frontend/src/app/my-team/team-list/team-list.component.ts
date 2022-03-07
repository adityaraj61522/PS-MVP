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
    this.getGoal.org_id=this.teamMemberDetails.org_id;
    this.getGoal.goal_owner_id=this.teamMemberDetails.user_id;

    // Get Goals
    this.http.post(`/api/v1/employee/getgoals`, this.getGoal, this.requestOptions).subscribe((response)=>{
      console.log(response);
      this.goalData=Object.values(response)[0];
      console.log("goal_DATA list:---", this.goalData)
      
    },(error)=>{
      console.error(error);
    })
  }

}
