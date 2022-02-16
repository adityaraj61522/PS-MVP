import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
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

  userdata={
    token:"",
    expires:"",
    user:""
  }
  userData:any;
  ngOnInit(): void {
    this.userdata.token=JSON.parse(JSON.stringify(sessionStorage.getItem("token")));
    this.userdata.expires=JSON.parse(JSON.stringify(sessionStorage.getItem("expires")));
    this.userdata.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("userData"))));
    console.log(this.userdata.user[0]);
    this.userData=this.userdata.user[0]
    console.log(this.userData.first_name);
  }
}
