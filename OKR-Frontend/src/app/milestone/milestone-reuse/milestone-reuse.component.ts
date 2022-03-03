import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-milestone-reuse',
  templateUrl: './milestone-reuse.component.html',
  styleUrls: ['./milestone-reuse.component.css']
})
export class MilestoneReuseComponent implements OnInit {
  @Input()   refFrom!: string;
  @Input()   goalId!: any;
  show = false

  constructor() { }

  ngOnInit(): void {
  }


  objectiveShow(){
    this.show=true;
  } 

  objectiveHide(){
    // console.log('objective hide',this.show);
    this.show = false
    // console.log('objective hide',this.show);
    
  
  }

}
