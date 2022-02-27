import { HttpClientModule, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgStyle } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable,BehaviorSubject, OperatorFunction } from 'rxjs';
import { debounceTime,switchMap, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent implements OnInit {
  ngOnInit(): void {
      
  }


}
