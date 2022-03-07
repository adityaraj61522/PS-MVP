import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-milestone-list',
  templateUrl: './milestone-list.component.html',
  styleUrls: ['./milestone-list.component.css'],
})
export class MilestoneListComponent implements OnInit {
  constructor() {}
  @Input() public deleteMilestone!: (
    milestone_name: any,
    milestone_id: any,
    org_id: any,
    goal_id: any
  ) => void;
  @Input() milestoneDetails: any;
  @Input() goal_data: any;
  dp = false;
  check = false;
  checkin() {
    if (this.check == false) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
  showDp() {
    if (this.dp == false) {
      this.dp = true;
    } else {
      this.dp = false;
    }
  }
  completed=false
  ngOnInit(): void {
    // console.log(this.milestoneDetails.milestone_status, 'hjdsbfjchsdjh');
    console.log(this.goal_data[0],"goal")
    if(this.milestoneDetails.milestone_status=="Completed"){
      this.completed=true;
    }else{
      this.completed=false;
    }
  }
}
