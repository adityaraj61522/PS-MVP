import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor( private http:HttpClient, private router:Router,private toastr: ToastrService) { }
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

  orgData={
    org_id:""
  }

  allUsers:any;
  refreshComponent(){
    console.log("refresh");
    this.ngOnInit();
  }


  show=false;
  isLoad=false;
  showSuccess(todo:any) {
    if(todo=='DELETE') this.toastr.success("User Deleted Successfully...", 'Success');
    if(todo=='MAKE_ADMIN') this.toastr.success("User set as Admin...", 'Success');
    if(todo=='DELETE') this.toastr.success("User Removed as Admin...", 'Success');
  }
  showError() {
    this.toastr.error('Something went wrong!!!', 'Error!!!');
  }
  adminUserOperationReq = {
    user_id:"",
    admin_user_id:"",
    todo:""
  }
  adminUserOperation=(user_id: any,admin_user_id:any , todo:any)=>{
    console.log(todo);
    this.isLoad=false; //true
    console.log("Delete User")
    this.adminUserOperationReq.user_id= user_id;
    this.adminUserOperationReq.admin_user_id=admin_user_id;
    this.adminUserOperationReq.todo=todo;
    var url="";
    if(todo=='DELETE'){
      url=`/api/v1/admin/delete-user`;
    }
    if(todo=='MAKE_ADMIN' || todo=='REMOVE_ADMIN'){
      url=`/api/v1/admin/makeOrRemoveAdmin`
    }
    console.log("url==",url)
    this.http.post(`${url}`,this.adminUserOperationReq, this.requestOptions).subscribe((result:any)=>{
      // console.log(result:any); 
      console.log(result);
      this.isLoad = false;
      this.show=false;
      this.showSuccess(todo);
      this.ngOnInit();
    },(error)=>{
      console.error(error);
      this.showError();
      this.show=false;
      this.isLoad = false;
    });
  }


  ngOnInit(): void {
    this.orgData.org_id=sessionStorage['orgDetails_id']
    console.log(this.orgData.org_id)

    // Get Goals
    this.http.post(`/api/v1/admin/getUsers`, this.orgData, this.requestOptions).subscribe((response)=>{
      console.log(response);
      this.allUsers=response;
      console.log("team_DATA:---", this.orgData)
      
    },(error)=>{
      console.error(error);
    })
  }
addUser(){
  this.router.navigate(['/register'], {
    queryParams: { action: `addUser` },
  });
}
}
