import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css'],
})
export class GoalListComponent implements OnInit {
  @Input() goalDetails: any;
  @Input() public deleteGoal!: (
    goal_name: any,
    goal_id: any,
    org_id: any
  ) => void;
  constructor(private http: HttpClient, private router: Router) {}

  show2 = false;
  show3 = false;
  dp = false;
  showDp() {
    if (this.dp == false) {
      this.dp = true;
    } else {
      this.dp = false;
    }
  }
  openUpdateDp() {
    this.show3 = true;
  }
  objectiveHide() {
    this.show3 = false;
  }

  getGoalDetails() {
    this.router.navigate(['/objective-deatils'], {
      queryParams: { ID: `${this.goalDetails.goal_id}` },
    });
  }

  ngOnInit(): void {}
}
