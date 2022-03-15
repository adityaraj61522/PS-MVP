import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkin-history',
  templateUrl: './checkin-history.component.html',
  styleUrls: ['./checkin-history.component.css']
})
export class CheckinHistoryComponent implements OnInit {

  constructor( private http : HttpClient) { }

  @Input() milestoneDetails:any;
  req={
    milestone_id:""
  }
  checkin_history:any;
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'x-access-token' : JSON.parse(JSON.stringify(sessionStorage.getItem("token"))),
    'x-key':JSON.parse(JSON.stringify(sessionStorage.getItem("user_id"))),
    'x-org':JSON.parse(JSON.stringify(sessionStorage.getItem("orgDetails_id")))
  }  
  requestOptions = {
    headers: new HttpHeaders(this.headers),
  };
  ngOnInit(): void {
    this.req.milestone_id=this.milestoneDetails.milestone_id;
    this.http.post(`/api/v1/employee/checkin-history`, this.req , this.requestOptions
  ).subscribe((result:any)=>{
      console.log(result);
      this.checkin_history=result;
    },(error)=>{
      console.error(error);
    });
  }

}
