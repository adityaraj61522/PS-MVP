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

  okr(){
    this.employee=true;
    this.admin=false;
  }
  dashboard(){
    this.admin=true;
    this.employee=false;
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
