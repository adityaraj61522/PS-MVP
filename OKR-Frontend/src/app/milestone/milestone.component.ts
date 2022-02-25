import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../apiCollection/api.service';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';



@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {
  allUsers:any = []
  public model: any;

  constructor(private fb: FormBuilder, private http : HttpClient,private apiData:ApiService) { 
    this.apiData.getUsers().subscribe((result)=>{

      this.allUsers = result
    },(error)=>{
      console.error(error);
    });
  }

  myForm!: FormGroup;

  show=false;
  show2=false;
  choice:string = 'boolean';
  
  // test now start


 
 inFormatter = (x: {full_name: string}) => x.full_name;
outFormatter = (x: {full_name: string}) => x.full_name; 

  search: OperatorFunction<string, readonly string[]> = (text$: 
    Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.allUsers.filter((v: any) => v.full_name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
    )


  //test now end
   

  ngOnInit(): void {
    this.myForm = this.fb.group({
      goal_id: "1",
      org_id: "1",
      milestone_name: ['',[Validators.required]],
      milestone_start_date: ['',[Validators.required]],
      milestone_due_date: ['',[Validators.required]],
      milestone_complete_date: ['',[Validators.required]],
      is_active: "1",
      created_by: "1",
      milestone_weightage: "100",

      //owner detail
      ownerObj:{},
      // milestone_owner_id: '1',
      // milestone_owner_name: 'ravi',
      // milestone_owner_email: 'ravi@gmail.com',

      //boolean
      milestone_status: ['not completed',[Validators.required]],
      
      //progress
      milestone_progress: [0,[Validators.required,Validators.min(0),Validators.max(100)]],

      // metric
      metric_start_value: ['0',[Validators.required,Validators.min(0)]],
      metric_target_value: ['0',[Validators.required,Validators.min(0)]],
      metric_curr_value: ['0',[Validators.required,Validators.min(0)]],


    });


    // call user api
    
  }

  objectiveShow(){
    this.show=true;
  }

  objectiveHide(){
    this.show=false;
  }


  changeChoice(option:string){
    this.choice = option

    
  }





  onSubmit(form: FormGroup) {
    // console.log(form.value.ownerObj);

    const extraDetails = {
      milestone_type: this.choice,
      milestone_owner_id: form.value.ownerObj.user_id,
      milestone_owner_name: form.value.ownerObj.full_name,
      milestone_owner_email: form.value.ownerObj.email,
    }

    const milestoneObj = {...form.value,extraDetails}
  

    if(this.choice=='boolean'){
      delete milestoneObj.milestone_progress;
      delete milestoneObj.metric_curr_value;
      delete milestoneObj.metric_start_value;
      delete milestoneObj.metric_target_value;
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
    this.apiData.createMilestone(data).subscribe((result)=>{
      console.log(result); 
    },(error)=>{
      console.error(error);
    });
    
  }

}

function v(v: any, arg1: (any: any) => boolean): any {
  throw new Error('Function not implemented.');
}
 