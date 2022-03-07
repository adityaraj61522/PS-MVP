import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  constructor(private router:Router) { }

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

  getGoal={
    org_id:"",
    goal_owner_id:""
  };
  goalData:any;

  editUser(){
    this.router.navigate(['/register'], {
      queryParams: { user: `admin_update` },
    });
  }
  ngOnInit(): void {
  }

}
