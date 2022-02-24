import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-objective-details',
  templateUrl: './objective-details.component.html',
  styleUrls: ['./objective-details.component.css']
})
export class ObjectiveDetailsComponent implements OnInit {

  constructor(private http : HttpClient, private route : ActivatedRoute) { }

  Id:any;
  org_id:any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      console.log(params);
      this.Id=params["ID"];
      console.log(this.Id);
      this.org_id=sessionStorage['orgDetails.id'];
      console.log(this.org_id)
    })    
    // this.getDataFromAPI();
    // console.log(this.userData); 

  }

  getGoalDetails(){
    // return this.http.post()

  }

}
