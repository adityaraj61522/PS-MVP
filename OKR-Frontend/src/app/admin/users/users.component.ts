import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor( private http:HttpClient) { }
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

  orgData={
    org_id:""
  }

  allUsers:any;

  ngOnInit(): void {
    this.orgData.org_id=sessionStorage['orgDetails.id']
    console.log(this.orgData.org_id)

    // Get Goals
    this.http.post(`/api/v1/admin/getUsers`, this.orgData, this.requestOptions).subscribe((response)=>{
      console.log(response);
      this.allUsers=response;
      // console.log("team_DATA:---", this.teamMembers)
      
    },(error)=>{
      console.error(error);
    })
  }

}
