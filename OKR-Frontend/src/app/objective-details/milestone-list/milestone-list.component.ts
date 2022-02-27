import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-milestone-list',
  templateUrl: './milestone-list.component.html',
  styleUrls: ['./milestone-list.component.css']
})
export class MilestoneListComponent implements OnInit {

  constructor() { }
  @Input() public deleteMilestone !: (milestone_name: any, milestone_id:any , org_id: any) => void;
  @Input() milestoneDetails:any;
  dp=false;
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
