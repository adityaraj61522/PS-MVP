import { Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  myForm!: FormGroup;

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
  ngOnInit(): void {
    this.myForm = this.fb.group({
      // email: [''],
      // password:['']
      milestoneName: [''],
      // password:['', Validators.required]
  
    });

    // this.userdata.token=JSON.parse(JSON.stringify(sessionStorage.getItem("token")));
    // this.userdata.expires=JSON.parse(JSON.stringify(sessionStorage.getItem("expires")));
    // this.userdata.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    // console.log(this.userdata.user[0]);
    // this.userData=this.userdata.user[0]
    // console.log(this.userData.first_name);
  }
  addObjective(form: FormGroup){ 
    // this.newObjective.goal_name=this.ObjFormData.value.goal_name;
    // this.newObjective.goal_description=this.ObjFormData.value.goal_description;
    // this.newObjective.goal_start_date=this.ObjFormData.value.goal_start_date;
    // this.newObjective.goal_due_date=this.ObjFormData.value.goal_due_date;
    // this.newObjective.goal_quater=this.ObjFormData.value.goal_quater;
    // this.newObjective.goal_owner_name=this.ObjFormData.value.goal_owner_name;
    // this.newObjective.linked_org_goal_id=this.ObjFormData.value.linked_org_goal_id;
    // // this.show=false;
    // // this.show2=true;

    // console.log(this.newObjective)
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

}
 