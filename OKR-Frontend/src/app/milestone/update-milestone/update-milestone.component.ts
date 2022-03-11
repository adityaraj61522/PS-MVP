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
  choice:string = '';
  min_target_matrix:number = 1;
  showTargetFiledError:boolean = false
  min_due_date:string = ''
  start_date:string = ''
  end_date:string = ''

  getUser={
    org_id:"1"
  }

  updateForm = new FormGroup({ 
    milestone_id:new FormControl(''),
    milestone_name:new FormControl(''),
    milestone_progress:new FormControl(''),
    milestone_start_date:new FormControl(''),
    milestone_due_date:new FormControl(''),
    milestone_type:new FormControl(''),
    milestone_owner_id:new FormControl(''),
    milestone_owner_name:new FormControl(''),
    milestone_owner_email:new FormControl(''),
    milestone_weightage:new FormControl(''),
    milestone_status:new FormControl(''),
    created_by:new FormControl(''),
    metric_start_value:new FormControl(''),
    metric_target_value:new FormControl(''),
    metric_curr_value:new FormControl(''),
  })

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
    console.log(this.goalData)
    console.log(this.milestoneData)
    this.choice = this.milestoneData.milestone_type;
    this.start_date = new Date(this.goalData.goal_start_date).toISOString().split('T')[0];
    this.end_date = new Date(this.goalData.goal_due_date).toISOString().split('T')[0];

    this.updateForm = new FormGroup({
      milestone_id:new FormControl(this.milestoneData.milestone_id),
      milestone_name:new FormControl(this.milestoneData.milestone_name),
      milestone_progress:new FormControl(this.milestoneData.milestone_progress),
      milestone_start_date:new FormControl(this.start_date),
      milestone_due_date:new FormControl(this.end_date),
      milestone_type:new FormControl(this.milestoneData.milestone_type),
      milestone_owner_id:new FormControl(this.milestoneData.milestone_owner_id),
      milestone_owner_name:new FormControl(this.milestoneData.milestone_owner_name),
      milestone_owner_email:new FormControl(this.milestoneData.milestone_owner_email),
      milestone_weightage:new FormControl(this.milestoneData.milestone_weightage),
      milestone_status:new FormControl(this.milestoneData.milestone_status),
      created_by:new FormControl(this.milestoneData.created_by),
      metric_start_value:new FormControl(this.milestoneData.metric_start_value),
      metric_target_value:new FormControl(this.milestoneData.metric_target_value),
      metric_curr_value:new FormControl(this.milestoneData.metric_curr_value),
    })
    console.log(this.updateForm.value);
    

  //   this.myForm = this.fb.group({
  //     org_id: sessionStorage.getItem('orgDetails_id'),
  //     milestone_name: ['', [Validators.required]],
  //     milestone_start_date: ['', [Validators.required]],
  //     milestone_due_date: ['', [Validators.required]],
  //     is_active: '1',
  //     created_by: '1',
  //     ownerObj: {},
  //     metric_start_value: [0, [Validators.required, Validators.min(0)]],
  //     metric_target_value: [1, [Validators.required, Validators.min(this.min_target_matrix)]],
  //   });
  // }

  }

  ownerChange(){
    this.updateForm = new FormGroup({
      milestone_id:new FormControl(this.milestoneData.milestone_id),
      milestone_name:new FormControl(this.milestoneData.milestone_name),
      milestone_progress:new FormControl(this.milestoneData.milestone_progress),
      milestone_start_date:new FormControl(this.milestoneData.milestone_start_date),
      milestone_due_date:new FormControl(this.milestoneData.milestone_due_date),
      milestone_type:new FormControl(this.milestoneData.milestone_type),
      milestone_weightage:new FormControl(this.milestoneData.milestone_weightage),
      milestone_status:new FormControl(this.milestoneData.milestone_status),
      created_by:new FormControl(this.milestoneData.created_by),
      milestone_owner_id:new FormControl(this.model.user_id),
      milestone_owner_name:new FormControl(this.model.full_name),
      milestone_owner_email:new FormControl(this.model.email),
      metric_start_value:new FormControl(this.milestoneData.metric_start_value),
      metric_target_value:new FormControl(this.milestoneData.metric_target_value),
      metric_curr_value:new FormControl(this.milestoneData.metric_curr_value),

    })
  }

  // updateMilestoneRequest(data:any, milestoneType:string){
    onUpdateMilestone(){
      
    this.apiService.post(`/api/v1/employee/update-milestone`, this.updateForm.value).subscribe((result)=>{
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
