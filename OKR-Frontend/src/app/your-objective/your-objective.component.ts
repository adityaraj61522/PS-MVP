import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-your-objective',
  templateUrl: './your-objective.component.html',
  styleUrls: ['./your-objective.component.css']
})
export class YourObjectiveComponent implements OnInit {
  constructor() { }

  show=false;
  show2=false;

  newObjective={
    goal_name: "",
    goal_description: "",
    goal_start_date: "",
    goal_due_date: "",
    goal_quater: "",
    goal_owner_name: "",
    linked_org_goal_id: ""
  }

  @ViewChild('ObjForm') ObjFormData!: NgForm;
  addObjective(){
    this.newObjective.goal_name=this.ObjFormData.value.goal_name;
    this.newObjective.goal_description=this.ObjFormData.value.goal_description;
    this.newObjective.goal_start_date=this.ObjFormData.value.goal_start_date;
    this.newObjective.goal_due_date=this.ObjFormData.value.goal_due_date;
    this.newObjective.goal_quater=this.ObjFormData.value.goal_quater;
    this.newObjective.goal_owner_name=this.ObjFormData.value.goal_owner_name;
    this.newObjective.linked_org_goal_id=this.ObjFormData.value.linked_org_goal_id;
    // this.show=false;
    // this.show2=true;

    console.log(this.newObjective)
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
