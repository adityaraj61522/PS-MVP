import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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

  constructor( private http : HttpClient, private router:Router , private toastr: ToastrService) { }

  @Input() userDetails:any;

  @Input() public adminUserOperation !: (user_id: any, admin_user_id:any,todo:any)=>void;
  @Input() public makeAdmin !: (user_id: any, admin_user_id:any)=>void;
  @Input() isLoad: any;

  admin_user_id=sessionStorage.getItem("user_id");
  edit=false;
  goalShow=false;

  dp=false;
  showDp(){
    if(this.dp == false){
      this.dp=true;
    }else{
      this.dp =false;
    }
  }
  showGoal(){
    if(this.goalShow==false){
      this.goalShow=true;
    }else{
    this.goalShow=false;
    }
  }

  getGoal={
    org_id:"",
    goal_owner_id:""
  };
  goalData:any;

  showform=false;

  updateUser(){
    this.showform=true;
    // this.router.navigate(['/admin/users/update-user']);
    this.router.navigate(['admin/users/update-user'], {
      queryParams: { userid: this.userDetails.user_id },
    });
  }
  show=false;
  todo='';
  confirmationPopupShow(todo:any){
    this.show=true;
    console.log("todododo===" , todo)
    this.todo=todo;
  }
  confirmationPopupHide(){
    this.show=false;
  }
  confirmationMakeAdminPopupShow(){

  }
  confirmationRemoveAdminPopupShow(){

  }
  
  ngOnInit(): void {

  }

}
