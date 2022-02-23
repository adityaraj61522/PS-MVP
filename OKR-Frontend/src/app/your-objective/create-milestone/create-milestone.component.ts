import { HttpClientModule, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgStyle } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable,BehaviorSubject, OperatorFunction } from 'rxjs';
import { debounceTime,switchMap, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-milestone',
  templateUrl: './create-milestone.component.html',
  styleUrls: ['./create-milestone.component.css']
})
export class CreateMilestoneComponent implements OnInit {

  constructor( private http : HttpClient ) { }
  
  newKey={
    milestone_name:"",
    milestone_type:"",
    milestone_start_date:"",
    milestone_due_date:""
  }

  @ViewChild('KeyForm') KeyResFormData!: NgForm;
  

  addKey(){
    this.newKey.milestone_name=this.KeyResFormData.value.milestone_name;
    this.newKey.milestone_type=this.KeyResFormData.value.milestone_type;
    this.newKey.milestone_start_date=this.KeyResFormData.value.milestone_start_date;
    this.newKey.milestone_due_date=this.KeyResFormData.value.milestone_due_date;
    console.log(this.newKey);
  }

  ngOnInit(): void {
  }

}
