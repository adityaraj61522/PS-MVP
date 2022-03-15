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
  showSuccess() {
    this.toastr.success("Successfully Created...", 'Created');
  }
  showError() {
    this.toastr.error('Something went wrong!!!', 'Error!!!');
  }
  deleteUserReq = {
    user_id:"",
    admin_user_id:""
  }
  deleteUser=(user_id: any,admin_user_id:any)=>{
    this.isLoad=true;
    console.log("Delete User")
    this.deleteUserReq.user_id= user_id;
    this.deleteUserReq.admin_user_id=admin_user_id;
    this.http.post(`/api/v1/admin/delete-user`,this.deleteUserReq, this.requestOptions).subscribe((result:any)=>{
      // console.log(result:any); 
      console.log(result);
      this.isLoad = false;
      this.show=false;
      this.showSuccess();
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
