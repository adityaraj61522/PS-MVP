import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:9001'
  getUsersUrl = `${this.baseUrl}/api/v1/employee/getusers`;
  getManagers = `${this.baseUrl}/getManagers`;
  getSingleUserUrl = `${this.baseUrl}/api/v1/employee/getgoaldetails`;
  createMilestoneUrl = `${this.baseUrl}/api/v1/employee/create-milestone`;
  // uploadObjectiveUrl = `${this.baseUrl}/api/v1/admin/bulkUpload`;
  uploadObjectiveUrl = `${this.baseUrl}/bulkUpload`;
  updateObjectiveUrl = `${this.baseUrl}/api/v1/employee/update-objective`;


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
  user_id:any = "1"
  getUser={
    org_id:JSON.parse(JSON.stringify(sessionStorage.getItem("orgDetails_id")))
  }
  // set headers
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    // 'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'x-access-token' : JSON.parse(JSON.stringify(sessionStorage.getItem("token"))),
    'x-key':JSON.parse(JSON.stringify(sessionStorage.getItem("user_id"))),
    'x-org':JSON.parse(JSON.stringify(sessionStorage.getItem("orgDetails_id")))
  }  
  requestOptions = {
    headers: new HttpHeaders(this.headers)
  };



  constructor(private http: HttpClient) { }

  convertToDate(value:any){
    var dateobj = new Date(value)
    return dateobj.toISOString().split('T')[0]
  }


  upload_objective(file:any){
    this.user_id = sessionStorage.getItem("user_id")
    this.org_id = sessionStorage.getItem("org_id")
    const formData = new FormData();
    formData.append('excelfile', file); 
    formData.append('org_id', '1'); 
    formData.append('created_by', this.user_id); 
    formData.append('settingId', '1');

    return this.http.post<any>(this.uploadObjectiveUrl,formData)
  }
 getSingleUser(id:string){
  return this.http.post(this.getSingleUserUrl, {"goal_id":id},this.requestOptions);
 }
  getUsers(){
    console.log("alsjkhdfgalskhf;ashdf")
    console.log(this.getManagers, this.getUser)
      return this.http.post(this.getManagers, this.getUser);
  }
  createMilestone(data:any){
      return this.http.post(this.createMilestoneUrl, data,this.requestOptions);
  }
  updateObjective(data:any){
    return this.http.post(this.updateObjectiveUrl, data,this.requestOptions);
}
}
 