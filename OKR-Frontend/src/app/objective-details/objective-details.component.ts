import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-objective-details',
  templateUrl: './objective-details.component.html',
  styleUrls: ['./objective-details.component.css'],
})
export class ObjectiveDetailsComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}


  onManagerDecisionReq={
    goal_id:"",
    decision:"",
    reqType:"",
  }
  Id={
    goal_id:"",
  }
  org_id:any;
  goal_data:any;
  milestone_data:any;
  goalStatus: any;
  showButtons:any;

  user_id: any;
  line_manager_id: any;


  deleteMilestoneReq={ 
    milestone_id:"",
    org_id:"",
    goal_id: "",
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': '*',
    'x-access-token' : JSON.parse(JSON.stringify(sessionStorage.getItem("token"))),
    'x-key':JSON.parse(JSON.stringify(sessionStorage.getItem("user_id"))),
    'x-org':JSON.parse(JSON.stringify(sessionStorage.getItem("orgDetails_id")))
  }  
  requestOptions = { 
    headers: new HttpHeaders(this.headers),
  };

  deleteMilestone = (milestone_name: any, milestone_id: any, org_id: any, goal_id: any) => {
    this.deleteMilestoneReq.milestone_id = milestone_id;
    this.deleteMilestoneReq.org_id = org_id;
    this.deleteMilestoneReq.goal_id = goal_id;
    console.log('Goal id of milestone:---', this.deleteMilestoneReq.goal_id);
    console.log(this.deleteMilestoneReq);
    if (confirm('Are you sure want to delete ' + milestone_name)) {
      this.http
        .put(
          `/api/v1/employee/deletemilestone`,
          { milestone_id, org_id },
          this.requestOptions
        )
        .subscribe(
          (response) => {
            console.log('delete goal console:---', response);
            this.ngOnInit();
          },
          (error) => {
            console.error(error);
          }
        );
    }
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.Id.goal_id = params['ID'];
      this.onManagerDecisionReq.goal_id =  params['ID'];
    });
    this.getGoalDetails();
    this.getGoalMilestones();

   this.user_id = sessionStorage.getItem("user_id")
   this.line_manager_id = sessionStorage.getItem("userData")
   this.line_manager_id = JSON.stringify(JSON.parse(this.line_manager_id)[0].line_manager_id);

  }

  getGoalDetails(){
  // Get Goals
  return this.http.post(`/api/v1/employee/getgoaldetails`, this.Id, this.requestOptions).subscribe((response)=>{
   
    this.goal_data=response;
    console.log(this.goal_data);
    this.goalStatus = this.goal_data[0].goal_status;
    console.log('...goal_status...', this.goalStatus)
    },(error)=>{
      console.error(error);
    })
  }

  getGoalMilestones(){

  // Get Goals
  return this.http.post(`/api/v1/employee/getgoalmilestones`, this.Id, this.requestOptions).subscribe((response)=>{
   
    this.milestone_data=response;
  
    },(error)=>{
      console.error(error);
    })

  }

  onManagerDecision(decision: any, reqType:any){
    this.onManagerDecisionReq.decision = decision;
    this.onManagerDecisionReq.reqType= reqType;
    console.log(reqType);
      if(confirm('Are you sure you want to '+ decision + ' this request?')){
        this.http.post(`/api/v1/employee/managerdecision`, this.onManagerDecisionReq, this.requestOptions).subscribe((response)=>{
          console.log(response);
          let parsed_res = JSON.parse(JSON.stringify(response));
          console.log(parsed_res);
          if(parsed_res.status === 'SUCCESS'){
            this.showButtons = 'false'
            this.goalStatus=decision;
            console.log(this.showButtons,'dfafasfas')
          }
        },(error)=>{
          console.error(error);
        })
      }
    
  }
}
