import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  admin=false;
  employee=true;
  dpshow=false;

  teamsmembers:any;
  dpsh(){
    if(this.dpshow==false){
      this.dpshow=true
    }else{
      this.dpshow=false
    }
  }
  manager={
    line_manager_id:"",
    user_id:"",
    org_id:""
  }
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
  

  constructor(private router:Router, private http:HttpClient) { }
  userdata={
    token:"",
    expires:"",
    user:""
  }
  teamMembers:any;
  orgData:any;
  sessionData:any;
  ngOnInit(): void {
  
    if(window.location.pathname=='/admin/users'||window.location.pathname=='/admin/settings'||window.location.pathname=='/admin/bulkUpload'){
      this.admin=true;
      this.employee=false;
    }else{
      this.admin=false;
      this.employee=true;
    }

    // console.log(this.userdata.user[0]);

    this.orgData=sessionStorage.getItem("orgData");
    this.orgData=JSON.parse(this.orgData);
  
    this.sessionData=JSON.parse(sessionStorage['userData'])[0];
    this.manager.line_manager_id=this.sessionData.line_manager_id;
    this.manager.org_id=this.sessionData.org_id;
    this.manager.user_id=this.sessionData.user_id;
    console.log(this.sessionData,"-----session")

    this.http.post(`/api/v1/employee/getMyTeam`, this.manager, this.requestOptions).subscribe((response)=>{
      this.teamMembers=response;
      
    },(error)=>{
      console.error(error);
    })
  }
logout(){
  this.router.navigate(['/']);
  sessionStorage.clear();
}
}
