import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  constructor() { }
  @ViewChild('UpdateForm') ObjFormData!: NgForm;

  updateUser(){
    
  }



  ngOnInit(): void {
  }

}
