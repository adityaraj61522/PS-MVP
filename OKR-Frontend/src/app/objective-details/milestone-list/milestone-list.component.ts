import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-milestone-list',
  templateUrl: './milestone-list.component.html',
  styleUrls: ['./milestone-list.component.css']
})
export class MilestoneListComponent implements OnInit {

  constructor() { }
  @Input() milestoneDetails:any;

  ngOnInit(): void {
    console.log(this.milestoneDetails,"hjdsbfjchsdjh")
  }

}
