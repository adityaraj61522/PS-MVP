import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-milestone-list',
  templateUrl: './milestone-list.component.html',
  styleUrls: ['./milestone-list.component.css']
})
export class MilestoneListComponent implements OnInit {

  constructor() { }
  @Input() public deleteMilestone !: (goal_name: any, goal_id:any , org_id: any) => void;
  @Input() milestoneDetails:any;
  dp=false;
  check=false;
  checkin(){
    if(this.check==false){
      this.check=true;
    }else{
      this.check=false;
    }

  }
  showDp(){
    if(this.dp == false){
      this.dp=true;
    }else{
      this.dp =false;
    }
  }
  ngOnInit(): void {
    console.log(this.milestoneDetails,"hjdsbfjchsdjh")
  }

}
