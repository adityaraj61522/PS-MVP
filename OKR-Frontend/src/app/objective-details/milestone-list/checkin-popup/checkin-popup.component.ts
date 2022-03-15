import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkin-popup',
  templateUrl: './checkin-popup.component.html',
  styleUrls: ['./checkin-popup.component.css']
})
export class CheckinPopupComponent implements OnInit {

  constructor( private http : HttpClient,  private router : Router, private toastr:ToastrService ) { }

  @Input() milestoneDetails:any;

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
  disabled=true;
checked=false
  checkinForm = new FormGroup ({
    org_id:new FormControl(''),
    goal_id:new FormControl(''),
    metric_start_value:new FormControl(''),
    metric_target_value:new FormControl(''),
    metric_curr_value:new FormControl(''),
    metric_value_new:new FormControl(''),
    milestone_progress:new FormControl(''),
    check_in_status:new FormControl(''),
    milestone_id:new FormControl(''),
    milestone_progress_old:new FormControl(''),
    metric_already_achieved:new FormControl(''),
    close_checkin_old_value:new FormControl(''),
    close_checkin_new_value:new FormControl(''),
    boolean_status:new FormControl(''),
    checin_comment:new FormControl(''),
    milestone_type:new FormControl(''),
    // milestone_progress_old:new FormControl(''),
  })

  checkinFormSubmit = {
    org_id:"",
    goal_id:"",
    metric_start_value:"",
    metric_target_value:"",
    metric_curr_value:"",
    metric_value_new:"",
    milestone_progress:"",
    check_in_status:"",
    milestone_id:"",
    milestone_progress_old:"",
    metric_already_achieved:"",
    close_checkin_old_value:"",
    close_checkin_new_value:"",
    boolean_status:"",
    checin_comment:"",
    milestone_type:"",
    // milestone_progress_old:new FormControl(''),
  }
  new_val_error=false;

  progress:any;
  bool:any;

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 1) + '%';
    }
    return value;
  }
  updateProgress(event:any){
    this.progress = event.value;
    // this.checkinForm.value.milestone_progress=this.progress;
    // console.log(this.checkinForm,"checghkjekjkjk")
  }

  checkinGoal(){
      this.checkinFormSubmit.org_id=this.checkinForm.value.org_id;
      this.checkinFormSubmit.goal_id=this.checkinForm.value.goal_id;
      this.checkinFormSubmit.metric_start_value=this.milestoneDetails['metric_start_value'];
      this.checkinFormSubmit.metric_target_value=this.milestoneDetails['metric_target_value'];
      this.checkinFormSubmit.metric_curr_value=this.milestoneDetails['metric_curr_value'];
      this.checkinFormSubmit.metric_value_new=this.checkinForm.value.metric_value_new;
      // this.checkinFormSubmit.check_in_status=this.checkinForm.value.dob;
      this.checkinFormSubmit.milestone_progress=this.progress;
      this.checkinFormSubmit.milestone_id=this.checkinForm.value.milestone_id;
      this.checkinFormSubmit.milestone_progress_old=this.milestoneDetails['milestone_progress'];
      this.checkinFormSubmit.metric_already_achieved=this.checkinForm.value.metric_already_achieved;
      // this.checkinFormSubmit.close_checkin_old_value=this.checkinForm.value.conf_password;
      // this.checkinFormSubmit.close_checkin_new_value=this.checkinForm.value.conf_password;
      this.checkinFormSubmit.milestone_progress_old=this.checkinForm.value.milestone_progress;
      this.checkinFormSubmit.metric_already_achieved=this.checkinForm.value.password;
      this.checkinFormSubmit.close_checkin_old_value=this.checkinForm.value.conf_password;
      this.checkinFormSubmit.close_checkin_new_value=this.checkinForm.value.conf_password;
      this.checkinFormSubmit.milestone_type=this.checkinForm.value.milestone_type;
      this.checkinFormSubmit.boolean_status=this.checkinForm.value.boolean_status;
      this.checkinFormSubmit.checin_comment=this.checkinForm.value.checin_comment;

      if(this.checkinFormSubmit.metric_value_new>=this.checkinFormSubmit.metric_start_value && this.checkinFormSubmit.metric_value_new<=this.checkinFormSubmit.metric_target_value){
        this.new_val_error=false;
    this.http.post(`/api/v1/employee/checkin`, this.checkinFormSubmit , this.requestOptions
  ).subscribe((result:any)=>{
      console.log(result);
      sessionStorage.setItem("goalId",result.goalId);
      this.toastr.success("Checked In Successfully...", 'Success');
      this.ngOnInit();
      this.checked=true;
      setTimeout(() => {
      window.location.reload();
      }, 2000);
    },(error)=>{
      console.error(error);
      this.toastr.error("Something went wrong!!!", 'Error');
    });
  }else{
    this.new_val_error=true;
  }
    console.log(this.checkinForm.value);
  }

  ngOnInit(): void {
    this.progress=this.milestoneDetails.milestone_progress;
    this.bool=JSON.stringify(this.milestoneDetails.milestone_progress);

    this.checkinForm = new FormGroup ({
      org_id:new FormControl(this.milestoneDetails['org_id']),
      goal_id:new FormControl(this.milestoneDetails['goal_id']),
      metric_start_value:new FormControl(this.milestoneDetails['metric_start_value']),
      metric_target_value:new FormControl(this.milestoneDetails['metric_target_value']),
      metric_curr_value:new FormControl(this.milestoneDetails['metric_curr_value']),
      metric_value_new:new FormControl(),
      check_in_status:new FormControl(),
      milestone_progress:new FormControl(this.progress),
      milestone_id:new FormControl(this.milestoneDetails['milestone_id']),
      milestone_progress_old:new FormControl(this.milestoneDetails['milestone_progress_old']),
      metric_already_achieved:new FormControl(this.milestoneDetails['password']),
      close_checkin_old_value:new FormControl(this.milestoneDetails['conf_password']),
      close_checkin_new_value:new FormControl(this.milestoneDetails['conf_password']),
      milestone_type:new FormControl(this.milestoneDetails['milestone_type']),
      boolean_status:new FormControl(this.bool),
      checin_comment:new FormControl()
    })

    console.log(this.checkinForm,"checkform")
  }

}
