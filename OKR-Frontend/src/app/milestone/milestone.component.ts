import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {

  constructor(private fb: FormBuilder, private http : HttpClient) { }
  myForm!: FormGroup;

  show=false;
  show2=false;
  choice:string = 'boolean';

  ngOnInit(): void {
    this.myForm = this.fb.group({
      goal_id: 1,
      org_id: 1,
      milestone_name: ['',[Validators.required]],
      milestone_start_date: ['',[Validators.required]],
      milestone_due_date: ['',[Validators.required]],
      // milestone_complete_date: ['',[Validators.required]],
      is_active: 1,
      created_by:1,
      milestone_weightage: 100,

      //owner detail
      milestone_owner_id: '1',
      milestone_owner_name: 'ravu',
      milestone_owner_email: 'ravi@gmail.com',

      //boolean
      milestone_status: ['not completed',[Validators.required]],
      
      //progress
      milestone_progress: [0,[Validators.required,Validators.min(0),Validators.max(100)]],

      // metric
      metric_start_value: ['0',[Validators.required,Validators.min(0)]],
      metric_target_value: ['0',[Validators.required,Validators.min(0)]],
      metric_curr_value: ['0',[Validators.required,Validators.min(0)]],

    });
  }

  objectiveShow(){
    this.show=true;
  }

  objectiveHide(){
    this.show=false;
  }


  changeChoice(option:string){
    this.choice = option
    console.log(option);
    
  }





  onSubmit(form: FormGroup) {

    const milestoneObj = {...form.value,milestone_type: this.choice}
    console.log(milestoneObj);
    if(this.choice=='boolean'){
      delete milestoneObj.milestone_progress;
      delete milestoneObj.metric_curr_value;
      delete milestoneObj.metric_start_value;
      delete milestoneObj.metric_target_value;
      console.log(milestoneObj);
      this.postMilestoneReq(milestoneObj,'boolean')
    }
    if(this.choice=='progress'){
      delete milestoneObj.milestone_status;
      delete milestoneObj.metric_curr_value;
      delete milestoneObj.metric_start_value;
      delete milestoneObj.metric_target_value;
      this.postMilestoneReq(milestoneObj,'progress')
    }
    if(this.choice=='metric'){
      delete milestoneObj.milestone_status;
      delete milestoneObj.milestone_progress;
      this.postMilestoneReq(milestoneObj,'metric')
    }

  }


  postMilestoneReq = (data:any,milestoneType:string)=>{
    console.log(data);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
      'x-key':'1',
      'x-org':'1'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };

     
    this.http.post(`http://localhost:9001/api/v1/employee/create-milestone`, data,requestOptions).subscribe((result)=>{
      console.log(result); 
    },(error)=>{
      console.error(error);
    });
    
  }

}
 