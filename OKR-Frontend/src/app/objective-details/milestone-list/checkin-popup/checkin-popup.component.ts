import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkin-popup',
  templateUrl: './checkin-popup.component.html',
  styleUrls: ['./checkin-popup.component.css']
})
export class CheckinPopupComponent implements OnInit {

  constructor() { }

  @Input() milestoneDetails:any;

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 1) + '%';
    }

    return value;
  }


  ngOnInit(): void {
    console.log(this.milestoneDetails,"checkin")
  }

}
