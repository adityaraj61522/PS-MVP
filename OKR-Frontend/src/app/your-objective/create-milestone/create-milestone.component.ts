import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../apiCollection/api.service';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ToastService } from 'src/app/milestone/toast/toast-service';

@Component({
  selector: 'app-create-milestone',
  templateUrl: './create-milestone.component.html',
  styleUrls: ['./create-milestone.component.css'],
})
export class CreateMilestoneComponent implements OnInit {
  @Input() goalId: any;
  @Input() start_date:any
  @Input() end_date:any
  @Input() goal_name:any

  allUsers: any = [];

  public model: any;
  myForm!: FormGroup;
  isLoad = false
  show=false;
  show2=false;
  choice:string = 'boolean';
  successMsg:boolean = false
  errorMsg:boolean = false

  min_due_date:string = ''

  constructor(private fb: FormBuilder, private http : HttpClient,private apiData:ApiService,public toastService: ToastService) { 

    this.apiData.getUsers().subscribe((result)=>{
      this.allUsers = result
    },(error)=>{
      console.error(error);
    });
  }

  // search typehead now start

  inFormatter = (x: { full_name: string }) => x.full_name;
  outFormatter = (x: { full_name: string }) => x.full_name;

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.allUsers
              .filter(
                (v: any) =>
                  v.full_name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  //search typehead now end

  ngOnInit(): void {

    this.myForm = this.fb.group({
      org_id: sessionStorage.getItem('orgDetails_id'),
      milestone_name: ['', [Validators.required]],
      milestone_start_date: ['', [Validators.required]],
      milestone_due_date: ['', [Validators.required]],
      is_active: '1',
      created_by: '1',
      //owner detail
      ownerObj: {},
      // metric
      metric_start_value: [0, [Validators.required, Validators.min(0)]],
      metric_target_value: [1, [Validators.required, Validators.min(1)]],
    });

  }
  // for desable min date
  chooseStartDate(value:string) {
    this.min_due_date = value > this.end_date?value:this.end_date ;
  }
 

  changeChoice(option: string) {
    this.choice = option;
  }

  onSubmit(form: FormGroup) {

     this.isLoad = true

    var postReq:any = {
      goal_id:  this.goalId  || sessionStorage.getItem("goalId") ,
      is_active: "1",
      org_id: sessionStorage.getItem("orgDetails_id") || "1", 
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

    console.log(postReq);

    if (this.choice == 'boolean') {
      postReq['milestone_status'] = 'Not Completed';
      this.postMilestoneReq(postReq, 'boolean');
    }
    if (this.choice == 'progress') {
      postReq['milestone_progress'] = 0;
      this.postMilestoneReq(postReq, 'progress');
    }
    if (this.choice == 'metric') {
      postReq['metric_start_value'] = form.value.metric_start_value;
      postReq['metric_target_value'] = form.value.metric_target_value;
      postReq['metric_curr_value'] = form.value.metric_start_value;
      this.postMilestoneReq(postReq, 'metric');
    }
  }


  postMilestoneReq = (data:any,milestoneType:string)=>{
    this.apiData.createMilestone(data).subscribe((result)=>{
      console.log(result);
      if(result){
        this.isLoad = false
        // this.successMsg = true
        this.toastService.show('milestone has been created successfully', { classname: 'bg-success text-light', delay: 10000 })

        setInterval(() => {
          window.location.reload();
          }, 1000);
        }
      },
      (error) => {
        console.error(error);
        if (error) {
          this.isLoad = false;
          this.toastService.show('somthing went wrong', { classname: 'bg-danger text-light', delay: 10000 })
          // this.errorMsg = true;
        }
      }
    );
  };
}
