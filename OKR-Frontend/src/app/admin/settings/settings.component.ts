import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


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
  orgDetails={
    org_id:""
  }
  user_id:any;
  e=false;
  settingsDetails:any;
  constructor( private http : HttpClient,  private router : Router ) { }

  settingsForm = new FormGroup ({
    org_id:new FormControl(''),
    goal_setting_id:new FormControl(''),
    goal_frequency:new FormControl(''),
    align_company_objective:new FormControl(''),
    mandatory_company_objective:new FormControl(''),
    goal_creator:new FormControl(''),
    goal_updator:new FormControl(''),
    goal_approver:new FormControl(''),
    max_goals:new FormControl(''),
    min_goal:new FormControl(''),
    goal_setting_status:new FormControl(''),
    updated_by:new FormControl('')
  })

  async settingsChange(){
    await this.http.post(`/api/v1/admin/updateGoalSettings`,this.settingsForm.value , this.requestOptions
  ).subscribe((result:any)=>{
    console.log(this.settingsForm.value,"req")
      console.log(result,"Done");
    },(error)=>{
      console.error(error);
      this.e=true;

    });
  }

  async ngOnInit(): Promise<void> {
    this.user_id=sessionStorage.getItem('user_id');
    this.orgDetails.org_id=JSON.parse(JSON.stringify(sessionStorage.getItem('orgDetails_id')));
    await this.http.post(`/api/v1/admin/getGoalSettings`, this.orgDetails , this.requestOptions
  ).subscribe((result:any)=>{
      console.log(result);
      this.settingsDetails=result[0];
      this.settingsForm = new FormGroup ({
        org_id:new FormControl(this.orgDetails.org_id),
        goal_setting_id:new FormControl(this.settingsDetails['goal_setting_id']),
        goal_frequency:new FormControl(this.settingsDetails['goal_frequency']),
        align_company_objective:new FormControl(this.settingsDetails['align_company_objective']),
        mandatory_company_objective:new FormControl(this.settingsDetails['mandatory_company_objective']),
        goal_creator:new FormControl(this.settingsDetails['goal_creator']),
        goal_updator:new FormControl(this.settingsDetails['goal_updator']),
        goal_approver:new FormControl(this.settingsDetails['goal_approver']),
        max_goals:new FormControl(this.settingsDetails['max_goals']),
        min_goal:new FormControl(this.settingsDetails['min_goal']),
        goal_setting_status:new FormControl(this.settingsDetails['goal_setting_status']),
        updated_by:new FormControl(this.user_id)
      })
      console.log(this.settingsDetails,"first")
    },(error)=>{
      console.error(error);

    });

  }

}
