import { HttpHeaders } from '@angular/common/http';
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
  // okr(){
  //   this.employee=true;
  //   this.admin=false;
  // }
  // dashboard(){
  //   this.admin=true;
  //   this.employee=false;
  // }
  dpsh(){
    if(this.dpshow==false){
      this.dpshow=true
    }else{
      this.dpshow=false
    }
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
  

  constructor(private router:Router) { }
  userdata={
    token:"",
    expires:"",
    user:""
  }
  userData:any;
  orgData:any;
  ngOnInit(): void {
  
    if(window.location.pathname=='/admin/users'){
      this.admin=true;
      this.employee=false;
    }else if(window.location.pathname=='/admin/settings'){
      this.admin=true;
      this.employee=false;
    }else{
      this.admin=false;
      this.employee=true;
    }

    this.userdata.token=JSON.parse(JSON.stringify(sessionStorage.getItem("token")));
    this.userdata.expires=JSON.parse(JSON.stringify(sessionStorage.getItem("expires")));
    this.userdata.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    // console.log(this.userdata.user[0]);
    this.userData=this.userdata.user[0]

    this.orgData=sessionStorage.getItem("orgData")
    this.orgData=JSON.parse(this.orgData);
  

    // this.http.post(`/api/v1/employee/getMyTeam`, this.manager, this.requestOptions).subscribe((response)=>{
    //   console.log(response);
    //   this.teamMembers=response;
    //   console.log("team_DATA:---", this.teamMembers)
      
    // },(error)=>{
    //   console.error(error);
    // })
  }
logout(){
  this.router.navigate(['/']);
  sessionStorage.clear();
}
}
