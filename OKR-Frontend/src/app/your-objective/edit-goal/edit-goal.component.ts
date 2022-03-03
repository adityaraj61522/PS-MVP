import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit , Input} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../apiCollection/api.service';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';


@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.css']
})
export class EditGoalComponent implements OnInit {

  @Input() goalData:any;

  updateForm = new FormGroup({
    goal_name:new FormControl(''),
    goal_start_date:new FormControl(''),
    goal_due_date:new FormControl(''),
    goal_owner_name:new FormControl(''),
    linked_org_goal_id:new FormControl(''),
    goal_type:new FormControl('')
  })

  ID:any;
  userData:any;
  allUsers: any;
  public model: any;
  userdata: any;
  goaldata: any;
  constructor( private http : HttpClient, private route :ActivatedRoute, private router: Router, private apiData:ApiService) {
    this.apiData.getUsers().subscribe((result)=>{
      console.log(result);
      
      this.allUsers = result
    },(error)=>{
      console.error(error);
    });
   }

  Id={
    goal_id:""
  }
  // goal_data:any;
  goal_id:any;

  inFormatter = (x: {full_name: string}) => x.full_name;
outFormatter = (x: {full_name: string}) => x.full_name; 

  search: OperatorFunction<string, readonly string[]> = (text$: 
    Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.allUsers.filter((v: any) => v.full_name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)),
    )


  

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
    this.goaldata.token=JSON.parse(JSON.stringify(sessionStorage.getItem("token")));
    this.goaldata.expires=JSON.parse(JSON.stringify(sessionStorage.getItem("expires")));
    this.goaldata.user=JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("goalData"))));
    this.goalData=this.goaldata.user[0]
      // console.log(this.goal_data,"ABC");
      // this.Id.goal_id=params["ID"];
      // console.log(this.Id.goal_id);
      // this.org_id=sessionStorage['orgDetails.id'];
      // console.log(this.org_id)
    })   

  console.log(this.goalData)

  this.Id.goal_id=this.goalData.goal_id
  console.log("idnhjdjhjn",this.Id)
  this.getGoalDetails();
  }


  getGoalDetails(){
    const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc0OTcyMzA5MTQsImlzcyI6InFpbG8iLCJhdWQiOjF9.Kv9zMVAcDRpCjH3mqxv9tNoFOQoEwJOfOzFWsGyP2hg',
    'x-key':'1',
    'x-org':'1'
  }
  const requestOptions = {
    headers: new HttpHeaders(headers),
  };
    return this.http.post(`/api/v1/employee/getgoaldetails`, this.Id, requestOptions).subscribe((response)=>{
      console.log(response);
    // this.goal_data=response;
    this.goal_id=response;
    console.log("goal_id:---- ", this.goal_id);
    // console.log("goal_DATA:---", this.goal_data)
      this.updateForm = new FormGroup({
        goal_name:new FormControl(this.goalData['goal_name']),
        goal_start_date:new FormControl(this.goalData['goal_start_date']),
        goal_due_date:new FormControl(this.goalData['goal_due_date']),
        goal_owner_name:new FormControl(this.goalData['goal_owner_name']),
        linked_org_goal_id:new FormControl(this.goalData['linked_org_goal_id']),
        goal_type:new FormControl(this.goalData['goal_type'])
      })
      console.log(this.updateForm.value)
    },(error)=>{
      console.error(error);
    })
  }
  
  updateObjective(){
    this.http.put(`/api/v1/employee/update-objective`, this.updateForm.value).subscribe((result)=>{
      console.log(result);
    },(error)=>{
      console.error(error);
    });
  }
  
}
