import { HttpClientModule } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-your-objective',
  templateUrl: './your-objective.component.html',
  styleUrls: ['./your-objective.component.css']
})
export class YourObjectiveComponent implements OnInit {
  constructor( private http : HttpClient) { }

  show=false;
  show2=false;

  newObjective={
    goal_name: "",
    goal_description: "",
    goal_start_date: "",
    goal_due_date: "",
    goal_owner_name: "",
    linked_org_goal_id: ""
  }

  newKey={
    milestone_name:"",
    milestone_type:"",
    milestone_start_date:"",
    milestone_due_date:""
  }

  @ViewChild('ObjForm') ObjFormData!: NgForm;
  @ViewChild('KeyForm') KeyResFormData!: NgForm;
  addObjective(){
    this.newObjective.goal_name=this.ObjFormData.value.goal_name;
    this.newObjective.goal_description=this.ObjFormData.value.goal_description;
    this.newObjective.goal_start_date=this.ObjFormData.value.goal_start_date;
    this.newObjective.goal_due_date=this.ObjFormData.value.goal_due_date;
    this.newObjective.goal_owner_name=this.ObjFormData.value.goal_owner_name;
    this.newObjective.linked_org_goal_id=this.ObjFormData.value.linked_org_goal_id;
    // this.show=false;
    // this.show2=true;
    
    this.http.post(`http://localhost:9001/api/v1/employee/test`,this.newObjective).subscribe((result)=>{
      console.log(result); 
      // this.responseData=JSON.parse(JSON.stringify(result));
      // sessionStorage.setItem("token" , this.responseData.token);
      // sessionStorage.setItem("expires" , this.responseData.expires);
      // sessionStorage.setItem("userData" , this.responseData.user);
      // this.correctPassword=true;
      // this.router.navigate(
      //   ['/objectives']
      // );
    },(error)=>{
      console.error(error);
      // this.correctPassword=false;
    });

    console.log(this.newObjective)
  }

  addKey(){
    this.newKey.milestone_name=this.KeyResFormData.value.milestone_name;
    this.newKey.milestone_type=this.KeyResFormData.value.milestone_type;
    this.newKey.milestone_start_date=this.KeyResFormData.value.milestone_start_date;
    this.newKey.milestone_due_date=this.KeyResFormData.value.milestone_due_date;
    console.log(this.newKey);
  }
  objectiveShow(){
    this.show=true;
  }

  objectiveHide(){
    this.show=false;
  }

  keyresultHide(){
    this.show2=false;
  }
  previous(){
    this.show2=false;
    this.show=true;
  }


  userdata={
    token:"",
    expires:"",
    user:""
  }
  userData:any;
  ngOnInit(): void {
    this.userdata.token=JSON.parse(JSON.stringify(sessionStorage.getItem("token")));
    this.userdata.expires=JSON.parse(JSON.stringify(sessionStorage.getItem("expires")));
    this.userdata.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    console.log(this.userdata.user[0]);
    this.userData=this.userdata.user[0]
    console.log(this.userData.first_name);
  }
}
