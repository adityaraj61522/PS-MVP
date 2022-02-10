import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-your-objective',
  templateUrl: './your-objective.component.html',
  styleUrls: ['./your-objective.component.css']
})
export class YourObjectiveComponent implements OnInit {

  show=false;
  show2=false;
  objectiveShow(){
    this.show=true;
  }

  objectiveHide(){
    this.show=false;
  }

  keyresultShow(){
    this.show=false;
    this.show2=true;
  }
  keyresultHide(){
    this.show2=false;
  }
  previous(){
    this.show2=false;
    this.show=true;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
