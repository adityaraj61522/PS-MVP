import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  constructor() { }

  @Input() allUserDetails:any;

  edit=false;

  goalShow=false;
  showGoal(){
    if(this.goalShow==false){
      this.goalShow=true;
    }else{
    this.goalShow=false;
    }
  }

  editUser(){
    if(this.edit==true){
      this.edit=false;
    }else{
    this.edit=true
  }
}

  getGoal={
    org_id:"",
    goal_owner_id:""
  };
  goalData:any;


  ngOnInit(): void {
  }

}
