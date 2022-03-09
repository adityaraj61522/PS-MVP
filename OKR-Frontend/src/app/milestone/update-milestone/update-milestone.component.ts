import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-milestone',
  templateUrl: './update-milestone.component.html',
  styleUrls: ['./update-milestone.component.css']
})
export class UpdateMilestoneComponent implements OnInit {

  @Input() goalId: any;
  @Input() milestoneData: any
  @Input() goalData: any

  allUsers: any = [];
  public model: any;
  myForm!: FormGroup;
  choice:string = 'boolean';
  min_target_matrix:number = 1;
  showTargetFiledError:boolean = false
  min_due_date:string = ''
  start_date:string = ''
  end_date:string = ''

  getUser={
    org_id:"1"
  }

  constructor(private fb: FormBuilder, private http : HttpClient,private apiService:ApiService, private toastr: ToastrService) { 
    this.apiService.post(`/api/v1/employee/getusers`, this.getUser).subscribe((result)=>{
      console.log(result);
      
      this.allUsers = result
    },(error)=>{
      console.error(error);
    });
  }


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

  setTarget(value:string){
    this.min_target_matrix = +value + 1;
    // this.myForm.controls['metric_target_value']
  }
  showTargetError(value:string){
    var cur_target:number = +value
    if(cur_target<this.min_target_matrix){
      this.showTargetFiledError = true
    }
    else{
      this.showTargetFiledError = false
    }
  }
  // for desable min date
  chooseStartDate(curr:string) {
    this.min_due_date = curr;
    this.myForm.controls['milestone_due_date'].enable()
  }

  changeChoice(option: string) {
    this.choice = option;
  }

  ngOnInit(): void {
    console.log(this.milestoneData)
    console.log(this.goalData)
    this.start_date = new Date(this.goalData.goal_start_date).toISOString().split('T')[0];
    this.end_date = new Date(this.goalData.goal_due_date).toISOString().split('T')[0];

    this.myForm = this.fb.group({
      org_id: sessionStorage.getItem('orgDetails_id'),
      milestone_name: ['', [Validators.required]],
      milestone_start_date: ['', [Validators.required]],
      milestone_due_date: ['', [Validators.required]],
      is_active: '1',
      created_by: '1',
      ownerObj: {},
      metric_start_value: [0, [Validators.required, Validators.min(0)]],
      metric_target_value: [1, [Validators.required, Validators.min(this.min_target_matrix)]],
    });
  }

  onUpdateMilestone(form: FormGroup) {
    var reqBody:any = {
      is_active: "1",
      org_id: sessionStorage.getItem("orgDetails_id") || "1", 
      goal_id:  this.goalData.goal_id  || sessionStorage.getItem("goalId"),
      milestone_id: this.milestoneData.milestone_id,
      milestone_progress: this.milestoneData.milestone_progress,
      milestone_name: form.value.milestone_name,
      milestone_start_date: form.value.milestone_start_date,
      milestone_due_date: form.value.milestone_due_date,
      milestone_type: this.choice,
      milestone_owner_id: form.value.ownerObj.user_id,
      milestone_owner_name: form.value.ownerObj.full_name,
      milestone_owner_email: form.value.ownerObj.email,
      milestone_weightage: '60',
      milestone_status: 'Not Completed',
      created_by: sessionStorage.getItem('user_id'),
    };

    console.log(reqBody);

    if (this.choice == 'boolean') {
      reqBody['metric_start_value'] = 0;
      reqBody['metric_target_value'] = 0;
      reqBody['metric_curr_value'] = 0;
      this.updateMilestoneRequest(reqBody, 'boolean');
    }
    if (this.choice == 'progress') {
      reqBody['metric_start_value'] = 0;
      reqBody['metric_target_value'] = 0;
      reqBody['metric_curr_value'] = 0;
      this.updateMilestoneRequest(reqBody, 'progress');
    }
    if (this.choice == 'metric') {
      reqBody['metric_start_value'] = form.value.metric_start_value;
      reqBody['metric_target_value'] = form.value.metric_target_value;
      reqBody['metric_curr_value'] = form.value.metric_start_value;
      this.updateMilestoneRequest(reqBody, 'metric');
    }

  }

  updateMilestoneRequest(data:any, milestoneType:string){
    this.apiService.post(`/api/v1/employee/update-milestone`, data).subscribe((result)=>{
      console.log(result);
      // console.log("aaaaaa", this.model);
      this.toastr.success("Milestone Updated Successfully...", 'Success');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    },(error)=>{
      console.error(error);
      this.toastr.error('Something went wrong!!!', 'Error!!!');
    });
  }

}
