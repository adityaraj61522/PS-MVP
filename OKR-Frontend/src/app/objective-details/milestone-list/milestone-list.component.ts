import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-milestone-list',
  templateUrl: './milestone-list.component.html',
  styleUrls: ['./milestone-list.component.css'],
})
export class MilestoneListComponent implements OnInit {
  constructor() {}
   @Input() isLoad: any;
  @Input() public deleteMilestone!: (
    milestone_name: any,
    milestone_id: any,
    org_id: any,
    goal_id: any
  ) => void;
  @Input() public resetCheckin !: (
    org_id: any,
    goal_id:any,
    milestone_name: any,
    milestone_id: any,
    milestone_type: any,
    milestone_progress:any,
    metric_start_value:any,
    metric_curr_value:any,
  ) => void;
  @Input() milestoneDetails: any;
  
  showForm = false;

  @Input() goal_data: any;
  dp = false;
  check = false;
  checkin_history=false;
  checkin() {
    if (this.check == false) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
  checkinHistory(){
    if (this.checkin_history == false) {
      this.checkin_history = true;
    } else {
      this.checkin_history = false;
    }
  }
  showDp() {
    if (this.dp == false) {
      this.dp = true;
    } else {
      this.dp = false;
    }
  }

  showUpdateMilestone(){
    this.showForm = true;
    console.log("update milestone showForm :---", this.showForm)
  }
  hideUpdateMilestone(){
    this.showForm = false;
    console.log("update milestone showForm :---", this.showForm)
  }

  show=false;
  confirmationPopupShow(){
    this.show=true;
  }
  confirmationPopupHide(){
    this.show=false;
  }
  completed=false
  ngOnInit(): void {
    console.log(this.milestoneDetails)
    // console.log(this.milestoneDetails.milestone_status, 'hjdsbfjchsdjh');
    console.log(this.goal_data[0],"goal")
    if(this.milestoneDetails.milestone_status=="Completed"){
      this.completed=true;
    }else{
      this.completed=false;
    }
  }
}
