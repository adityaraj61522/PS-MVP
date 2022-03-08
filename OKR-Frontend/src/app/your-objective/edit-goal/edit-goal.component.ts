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

  @Input() goalData:any;

  updateForm = new FormGroup({
    goal_name:new FormControl(''),
    goal_start_date:new FormControl(''),
    goal_due_date:new FormControl(''),
    goal_owner_name:new FormControl(''),
    goal_owner_id:new FormControl(''),
    goal_owner_email:new FormControl(''),
    linked_org_goal_id:new FormControl(''),
    goal_type:new FormControl('')
  })

  ID:any;
  userData:any;
  allUsers: any;
  public model: any;
  userdata: any;
  goaldata: any;
  goal_data: any;
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
  allOrgGoal:any;
  getOrgGoal={
    org_id:""
  }

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
    this.getOrgGoal.org_id=JSON.parse(JSON.stringify(sessionStorage.getItem("orgDetails_id")));
  console.log(this.goalData)
    this.Id.goal_id=this.goalData.goal_id
    console.log("idnhjdjhjn",this.Id)
    this.getGoalDetails();

   // Get Orginizational goal
   this.http.post(`/api/v1/employee/getorganizationgoals`, this.getOrgGoal, this.requestOptions).subscribe((response)=>{
    this.allOrgGoal=response;
  },(error)=>{
    console.error(error);
  })
  }


  getGoalDetails(){
    return this.http.post(`/api/v1/employee/getgoaldetails`, this.Id, this.requestOptions).subscribe((response)=>{
      console.log(response);
      this.goalData=response;
      this.goalData=this.goalData[0];
      this.goalData.goal_start_date=this.goalData.goal_start_date.split("T")[0];
      this.goalData.goal_due_date=this.goalData.goal_due_date.split("T")[0];
    console.log("goal_DATA:---", this.goalData)
      this.updateForm = new FormGroup({
        goal_name:new FormControl(this.goalData['goal_name']),
        goal_start_date:new FormControl(this.goalData['goal_start_date']),
        goal_due_date:new FormControl(this.goalData['goal_due_date']),
        goal_owner_name:new FormControl(this.goalData['goal_owner_name']),
        linked_org_goal_id:new FormControl(this.goalData['linked_org_goal_id']),
        goal_type:new FormControl(this.goalData['goal_type']),
        goal_id:new FormControl(this.goalData['goal_id']),
        goal_owner_id:new FormControl(this.goalData['goal_owner_id']),
        goal_owner_email:new FormControl(this.goalData['goal_owner_email']),
      })
  
      console.log(this.updateForm.value,"jyhgasjhdjhasvhj")
    },(error)=>{
      console.error(error);
    })
  }
  
  updateObjective(){
    this.http.post(`/api/v1/employee/update-objective`, this.updateForm.value, this.requestOptions).subscribe((result)=>{
      console.log(result);
      console.log("aaaaaa", this.model);
      window.location.reload();
    },(error)=>{
      console.error(error);
    });
  }
  
}
