import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../apiCollection/api.service';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-create-milestone',
  templateUrl: './create-milestone.component.html',
  styleUrls: ['./create-milestone.component.css']
})
export class CreateMilestoneComponent implements OnInit {
  @Input() goalId:any;
 
  allUsers:any = []
  public model: any;
  myForm!: FormGroup;

  show=false;
  show2=false;
  choice:string = 'boolean';
  successMsg:boolean = false
  errorMsg:boolean = false
  min_due_date:string = ''

  constructor(private fb: FormBuilder, private http : HttpClient,private apiData:ApiService) { 
    this.apiData.getUsers().subscribe((result)=>{
      console.log(result);
      
      this.allUsers = result
    },(error)=>{
      console.error(error);
    });
  }


  
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
    console.log(this.goalId);
    
   

    
    this.myForm = this.fb.group({
      org_id: sessionStorage.getItem('orgDetails_id'),
      milestone_name: ['',[Validators.required]],
      milestone_start_date: ['',[Validators.required]],
      milestone_due_date: ['',[Validators.required]],
      is_active: "1",
      created_by: "1",
      //owner detail 
      ownerObj:{},
      // milestone_owner_id: '1', 
      // milestone_owner_name: 'ravi',
      // milestone_owner_email: 'ravi@gmail.com',

      //boolean
      // milestone_status: ['not completed',[Validators.required]],
      
      // //progress
      // milestone_progress: [0,[Validators.required,Validators.min(0),Validators.max(100)]],

      // metric
      metric_start_value: [0,[Validators.required,Validators.min(0)]],
      metric_target_value: [1,[Validators.required,Validators.min(1)]],



    });


    // call user api
    
  }
// for desable min date
  chooseDate(value:string){
    this.min_due_date = value
   
  }


  changeChoice(option:string){
    this.choice = option

    
  }





  onSubmit(form: FormGroup) {

    var postReq:any = {
      goal_id:  this.goalId  || sessionStorage.getItem("goalId") ,
      is_active: "1",
      org_id: sessionStorage.getItem("orgDetails_id") || "1", 
      milestone_name: form.value.milestone_name,
      milestone_start_date: form.value.milestone_start_date,
      milestone_due_date: form.value.milestone_due_date,
      milestone_type:this.choice,
      milestone_owner_id: form.value.ownerObj.user_id,
      milestone_owner_name: form.value.ownerObj.full_name,
      milestone_owner_email: form.value.ownerObj.email,
      milestone_weightage: "60",
      // milestone_complete_date: "2022-02-25",
      created_by: "1",
    }

   
  console.log(postReq);
  

    if(this.choice=='boolean'){
      postReq["milestone_status"] = 'not completed'
      this.postMilestoneReq(postReq,'boolean')
    }
    if(this.choice=='progress'){
      postReq["milestone_progress"] = 0
      this.postMilestoneReq(postReq,'progress')
    }
    if(this.choice=='metric'){
      postReq["metric_start_value"] = form.value.metric_start_value
      postReq["metric_target_value"] = form.value.metric_target_value
      postReq["metric_curr_value"] = form.value.metric_start_value
      this.postMilestoneReq(postReq,'metric')

    }

  }


  postMilestoneReq = (data:any,milestoneType:string)=>{
    this.apiData.createMilestone(data).subscribe((result)=>{
      console.log(result);
      if(result){
        this.successMsg = true
        setInterval(() => {
          window.location.reload();
          }, 1000);
      
      }
    },(error)=>{
      console.error(error);
      if(error){
        this.errorMsg = true
      }
    });
    
  }

}
