import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:9001'
  getUsersUrl = `${this.baseUrl}/api/v1/employee/getusers`;
  getSingleUserUrl = `${this.baseUrl}/api/v1/employee/getgoaldetails`;
  createMilestoneUrl = `${this.baseUrl}/api/v1/employee/create-milestone`;
  uploadObjectiveUrl = `${this.baseUrl}/api/v1/admin/bulkUpload`;

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
  getUser={
    org_id:"1"
  }
  // set headers
  headers = {
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    // 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
    // 'x-key':'1',
    // 'x-org':'1'
    'x-access-token' : JSON.parse(JSON.stringify(sessionStorage.getItem("token"))),
    'x-key':JSON.parse(JSON.stringify(sessionStorage.getItem("user_id"))),
    'x-org':JSON.parse(JSON.stringify(sessionStorage.getItem("orgDetails_id")))
  }  
  requestOptions = {
    headers: new HttpHeaders(this.headers),
  };

  constructor(private http: HttpClient) { }

  convertToDate(value:any){
    var dateobj = new Date(value)
    return dateobj.toISOString().split('T')[0]
  }


  upload_objective(file:any){
    const formData = new FormData();
    formData.append('file', file); 
    console.log('c2');
    return this.http.post(this.uploadObjectiveUrl,formData,this.requestOptions)
  }
 getSingleUser(id:string){
  return this.http.post(this.getSingleUserUrl, {"goal_id":id},this.requestOptions);
 }
  getUsers(){
      return this.http.post(this.getUsersUrl, this.getUser,this.requestOptions);
  }
  createMilestone(data:any){
      return this.http.post(this.createMilestoneUrl, data,this.requestOptions);
  }
}
 