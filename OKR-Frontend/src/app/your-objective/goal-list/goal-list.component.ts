import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {

  @Input() goalDetails:any;
  constructor() { }

  show3=false;
  dp=false;
  showDp(){
    if(this.dp == false){
      this.dp=true;
    }else{
      this.dp =false;
    }
  }
  openUpdateDp(){
    this.show3=true;
  }

  ngOnInit(): void {
  }

}
