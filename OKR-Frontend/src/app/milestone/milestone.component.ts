import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {
 @Input() goalId:any;

  constructor() { 

  }

  myForm!: FormGroup;

  show=false;
 
  // test now start

  ngOnInit(): void {
   

    
  }

  objectiveShow(){
    this.show=true;
  }

  objectiveHide(){
    this.show=false;
  }


}
 