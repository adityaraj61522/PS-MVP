import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:9001'
  getUsersUrl = `${this.baseUrl}/api/v1/employee/getusers`;
  createMilestoneUrl = `${this.baseUrl}/api/v1/employee/create-milestone`;

  showObjective:boolean = false;
  showMilestone:boolean = false

disableShowObjective=()=>{
  this.showObjective = false
}
enableShowObjective=()=>{
  this.showObjective = true
}
changeShowMilestone=()=>{
  this.showMilestone = !this.showMilestone
}
 


  org_id:any = "1"

  // set headers
   headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
    'x-key':'1',
    'x-org':'1'
  }
  requestOptions = {
    headers: new HttpHeaders(this.headers),
  
  };

  constructor(private http: HttpClient) { }




  getUsers(){
      return this.http.post(this.getUsersUrl, { "org_id":this.org_id},this.requestOptions);
  }
  createMilestone(data:any){
      return this.http.post(this.getUsersUrl, data,this.requestOptions);
  }
}
 