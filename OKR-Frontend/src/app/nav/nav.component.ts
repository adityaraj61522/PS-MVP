import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  admin=false;
  employee=true;
  dpshow=false;

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
  
  

  constructor() { }
  userdata={
    token:"",
    expires:"",
    user:""
  }
  userData:any;
  orgData:any;
  ngOnInit(): void {
    console.log(window.location.pathname);
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
    console.log(sessionStorage,"dkhjjscnjkwds");
    this.orgData=sessionStorage.getItem("orgData")
    this.orgData=JSON.parse(this.orgData);
    console.log(this.orgData,'jhsjhaxjhahjzhj')
  }

}
