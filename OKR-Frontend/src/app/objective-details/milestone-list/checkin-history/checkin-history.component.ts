import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkin-history',
  templateUrl: './checkin-history.component.html',
  styleUrls: ['./checkin-history.component.css']
})
export class CheckinHistoryComponent implements OnInit {

  constructor() { }

  @Input() milestoneDetails:any;

  ngOnInit(): void {
  }

}
