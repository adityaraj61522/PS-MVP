import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkin-history-card',
  templateUrl: './checkin-history-card.component.html',
  styleUrls: ['./checkin-history-card.component.css']
})
export class CheckinHistoryCardComponent implements OnInit {

  constructor() { }
  @Input() checkin_history:any;
  @Input() milestoneDetails:any;
  created_date:any;

  ngOnInit(): void {
  }

}
