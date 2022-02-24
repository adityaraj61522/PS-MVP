import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  @Input() teamMemberDetails:any;

  constructor() { }

  ngOnInit(): void {
  }

}
