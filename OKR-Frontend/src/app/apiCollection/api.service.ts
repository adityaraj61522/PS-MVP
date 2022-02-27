import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:9001'
  getUsersUrl = `${this.baseUrl}/api/v1/employee/getusers`;
  createMilestoneUrl = `${this.baseUrl}/api/v1/employee/create-milestone`;
 


  org_id:any = "1"

  // set headers
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

  constructor(private http: HttpClient) { }




  getUsers(){
      return this.http.post(this.getUsersUrl, { "org_id":this.org_id},this.requestOptions);
  }
  createMilestone(data:any){
      return this.http.post(this.createMilestoneUrl, data,this.requestOptions);
  }
}
 