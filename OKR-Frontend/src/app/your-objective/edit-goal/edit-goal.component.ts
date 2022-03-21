import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit , Input} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


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
  @Input() start_date:any
  @Input() end_date:any
  @Input() goalId: any;

  currgoalId: any;

  isSelect:boolean = true

  //startDateTo = this.goalData['goal_start_date'] || ''

  updateForm = new FormGroup({
    goal_id:new FormControl(''),
    goal_name:new FormControl(''),
    goal_start_date:new FormControl(''),
    goal_due_date:new FormControl(''),
    goal_owner_name:new FormControl(''),
    goal_owner_id:new FormControl(''),
    goal_owner_email:new FormControl(''),
    linked_org_goal_id:new FormControl(''),
    goal_type:new FormControl(''),
    onwerObj:new FormGroup({})
  })

  ID:any;
  userData:any;
  allUsers: any = [];
  public model: any;
  userdata: any;
  goaldata: any;
  goal_data: any;
  todayDate = new Date().toISOString().split("T")[0];
  
  constructor( private fb: FormBuilder, private http : HttpClient, private route :ActivatedRoute, private router: Router, private apiService:ApiService, private toastr: ToastrService) {
    this.apiService.post(`/api/v1/employee/getusers`, this.getUser).subscribe((result)=>{
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

  getUser={
    org_id:"1"
  }

  myForm!: FormGroup;

  min_due_date:string = ''

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
    console.log(this.goalData["goal_start_date"])
    console.log(this.goalId)
   // this.currgoalId=this.goalId.goal_id;
   this.goalData.goal_start_date=this.goalData.goal_start_date.split("T")[0];
    this.goalData.goal_due_date=this.goalData.goal_due_date.split("T")[0];
    console.log(this.start_date);

    this.myForm = this.fb.group({
      goal_id:new FormControl(this.goalData['goal_id']),
      goal_name:new FormControl(this.goalData['goal_name']),
      goal_start_date:new FormControl(this.goalData['goal_start_date']),
      goal_due_date:new FormControl(this.goalData['goal_due_date']),
      goal_owner_name:new FormControl(this.goalData['goal_owner_name']),
      linked_org_goal_id:new FormControl(this.goalData['linked_org_goal_id']),
      goal_type:new FormControl(this.goalData['goal_type']),
      goal_owner_id:new FormControl(this.goalData['goal_owner_id']),
      goal_owner_email:new FormControl(this.goalData['goal_owner_email']),
      ownerObj: {},
    });
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
  chooseStartDate(cur:string) {
    this.min_due_date = cur
    this.myForm.controls['goal_due_date'].enable()

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
        goal_id:new FormControl(this.goalData['goal_id']),
        goal_name:new FormControl(this.goalData['goal_name']),
        goal_start_date:new FormControl(this.goalData['goal_start_date']),
        goal_due_date:new FormControl(this.goalData['goal_due_date']),
        goal_owner_name:new FormControl(this.goalData['goal_owner_name']),
        linked_org_goal_id:new FormControl(this.goalData['linked_org_goal_id']),
        goal_type:new FormControl(this.goalData['goal_type']),
        goal_owner_id:new FormControl(this.goalData['goal_owner_id']),
        goal_owner_email:new FormControl(this.goalData['goal_owner_email']),
      })
  
      console.log(this.updateForm.value,"jyhgasjhdjhasvhj")
    },(error)=>{
      console.error(error);
    })
  }
checkFun=(event:any)=>{
  console.log(event.value);
  
}
  ownerChange(){
    this.updateForm = new FormGroup({
      goal_id:new FormControl(this.goalData['goal_id']),
      goal_name:new FormControl(this.goalData['goal_name']),
      goal_start_date:new FormControl(this.goalData['goal_start_date']),
      goal_due_date:new FormControl(this.goalData['goal_due_date']),
      // goal_owner_name:new FormControl(this.goalData['goal_owner_name']),
      linked_org_goal_id:new FormControl(this.goalData.linked_org_goal_id),
      goal_type:new FormControl(this.model.goal_type),
      goal_owner_id:new FormControl(this.model.user_id),
      goal_owner_name:new FormControl(this.model.full_name),
      goal_owner_email:new FormControl(this.model.email),
    

    
    })
  }
  onSubmit(form: FormGroup) {


  

 

  
  // updateObjective(form:FormGroup){
  //   //console.log(this.updateForm);
  //   console.log(form.value)
  //   console.log(form.value.ownerObj.full_name)
  //   var postReq:any = {
  //     goal_id:  this.goalId ,
  //     is_active: "1",
  //     org_id: sessionStorage.getItem("orgDetails_id") || "1", 
  //     goal_name: form.value.goal_name,
  //     goal_start_date: form.value.goal_start_date,
  //     goal_due_date: form.value.goal_due_date,
  //     goal_owner_id: form.value.ownerObj.user_id,
  //     goal_owner_name: form.value.ownerObj.full_name,
  //     goal_owner_email: form.value.ownerObj.email,
  //     created_by: sessionStorage.getItem('user_id'),
  //   };
  //   console.log(postReq);
    
    
console.log(this.currgoalId)
      var postReq:any = {
        goal_id:  this.goalData.goal_id,
        is_active: "1",
        org_id: sessionStorage.getItem("orgDetails_id") || "1", 
        goal_name: form.value.goal_name,
        goal_start_date: form.value.goal_start_date,
        goal_due_date: form.value.goal_due_date,
        goal_owner_id: form.value.ownerObj.user_id,
        goal_owner_name: form.value.ownerObj.full_name,
        goal_owner_email: form.value.ownerObj.email,
   
      };
      this.http.put(`/api/v1/employee/update-objective`, postReq, this.requestOptions).subscribe((result)=>{
   
      console.log(postReq);
      console.log(result);
      console.log("aaaaaa", this.model);
      this.toastr.success("Update Goal Successfully...", 'Success');
        setTimeout(() => {
        window.location.reload();
        }, 1000);
      //window.location.reload();
    },(error)=>{
      console.error(error);
      this.toastr.error('Something went wrong!!!', 'Error!!!');
    });
  }
  
}
