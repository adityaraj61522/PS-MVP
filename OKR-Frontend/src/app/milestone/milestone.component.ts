import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../apiCollection/api.service';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {
  userObj:any = []

  constructor(private fb: FormBuilder, private http : HttpClient,private apiData:ApiService) { 
    this.apiData.getUsers().subscribe((result)=>{
      // console.log(result); 
      this.userObj = result
    },(error)=>{
      console.error(error);
    });
  }
  myForm!: FormGroup;

  show=false;
  show2=false;
  choice:string = 'boolean';
  
  // test now start
  public model: any={
    name:'loki'
  };

  demo:any = [
    {id:1,name:'ravi',text:'hello 1'},
    {id:2,name:'ravi 2',text:'hello 2'},
    {id:3,name:'ravi 3',text:'hello 3'}
  ]

     search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>{
       console.log('thisi is mode',this.model);
       
      return  this.model = text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(term =>   term.length < 2 ? []
            : this.demo.filter((v: any)=> {
              // console.log(v.name);
              // console.log(term);
              if( !v.name.indexOf(term.toLocaleLowerCase())    ){
                console.log(v.name);
                
                this.model = v.name
                return v.name
              }


            //   let obj = this.demo.find((o:any) => o.name === term);

            // console.log(obj);



            // return  v.indexOf(term.toLowerCase()) > -1
            }))
          )

     }


  //test now end
  

  ngOnInit(): void {
    this.myForm = this.fb.group({
      goal_id: "1",
      org_id: "1",
      milestone_name: ['',[Validators.required]],
      milestone_start_date: ['',[Validators.required]],
      milestone_due_date: ['',[Validators.required]],
      milestone_complete_date: ['',[Validators.required]],
      is_active: "1",
      created_by: "1",
      milestone_weightage: "100",

      //owner detail
      milestone_owner_id: '1',
      milestone_owner_name: 'ravi',
      milestone_owner_email: 'ravi@gmail.com',

      //boolean
      milestone_status: ['not completed',[Validators.required]],
      
      //progress
      milestone_progress: [0,[Validators.required,Validators.min(0),Validators.max(100)]],

      // metric
      metric_start_value: ['0',[Validators.required,Validators.min(0)]],
      metric_target_value: ['0',[Validators.required,Validators.min(0)]],
      metric_curr_value: ['0',[Validators.required,Validators.min(0)]],

    });


    // call user api
    
  }

  objectiveShow(){
    this.show=true;
  }

  objectiveHide(){
    this.show=false;
  }


  changeChoice(option:string){
    this.choice = option
    console.log(option);
    
  }





  onSubmit(form: FormGroup) {

    const milestoneObj = {...form.value,milestone_type: this.choice}
  

    if(this.choice=='boolean'){
      delete milestoneObj.milestone_progress;
      delete milestoneObj.metric_curr_value;
      delete milestoneObj.metric_start_value;
      delete milestoneObj.metric_target_value;
      this.postMilestoneReq(milestoneObj,'boolean')
    }
    if(this.choice=='progress'){
      delete milestoneObj.milestone_status;
      delete milestoneObj.metric_curr_value;
      delete milestoneObj.metric_start_value;
      delete milestoneObj.metric_target_value;
      this.postMilestoneReq(milestoneObj,'progress')
    }
    if(this.choice=='metric'){
      delete milestoneObj.milestone_status;
      delete milestoneObj.milestone_progress;
      this.postMilestoneReq(milestoneObj,'metric')
    }

  }


  postMilestoneReq = (data:any,milestoneType:string)=>{
    this.apiData.createMilestone(data).subscribe((result)=>{
      console.log(result); 
    },(error)=>{
      console.error(error);
    });
    
  }

}

function v(v: any, arg1: (any: any) => boolean): any {
  throw new Error('Function not implemented.');
}
 