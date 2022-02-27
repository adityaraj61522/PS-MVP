import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor( private http:HttpClient) { }

  orgData={
    org_id:""
  }

  allUsers:any;

  ngOnInit(): void {
    this.orgData.org_id=sessionStorage['orgDetails.id']
    console.log(this.orgData.org_id)
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
    this.http.post(`/api/v1/admin/getUsers`, this.orgData, requestOptions).subscribe((response)=>{
      console.log(response);
      this.allUsers=response;
      // console.log("team_DATA:---", this.teamMembers)
      
    },(error)=>{
      console.error(error);
    })
  }

}
