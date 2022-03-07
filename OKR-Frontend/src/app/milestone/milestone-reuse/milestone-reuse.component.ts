import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/apiCollection/api.service';

@Component({
  selector: 'app-milestone-reuse',
  templateUrl: './milestone-reuse.component.html',
  styleUrls: ['./milestone-reuse.component.css']
})
export class MilestoneReuseComponent implements OnInit {
  @Input()   refFrom!: string;
  @Input()   goalId!: any;
  show = false
  singleUser:any;

  goal_name:string = ''
  start_date:string = ''
  end_date:string = ''
  cur_goal_id:string = ''
  isMilestoneVaid:boolean = true

  constructor(private apiData:ApiService) { }

  ngOnInit(): void {

    this.cur_goal_id = this.goalId || sessionStorage.getItem("goalId")

    // console.log(sessionStorage.getItem("goalId"));
    console.log(this.cur_goal_id);
    
       // call single user 
       this.apiData.getSingleUser(this.cur_goal_id).subscribe((response)=>{
        
         
        this.singleUser= Object.values(response)[0];
        this.goal_name = Object.values(response)[0].goal_name
        const begin_date = this.apiData.convertToDate(Object.values(response)[0].goal_start_date)
        const finish_date = this.apiData.convertToDate(Object.values(response)[0].goal_due_date)
        const cur_date = this.apiData.convertToDate( new Date().toDateString())

        const begin = new Date(Object.values(response)[0].goal_start_date)
        const finish = new Date(Object.values(response)[0].goal_due_date)
        const cur = new Date()

        

        // this.start_date = firstval > secondval?firstval:secondval;
        // console.log(this.end_date);

        if(finish < cur){
          this.start_date = begin_date
          this.end_date = finish_date
          this.isMilestoneVaid = false
        }
        else if(begin < cur && cur < finish){
          this.start_date = cur_date
          this.end_date = finish_date
          this.isMilestoneVaid = true
          
        }
        else{
          this.start_date = begin_date
          this.end_date = finish_date
          this.isMilestoneVaid = true
          
        }
        

        
      },(error)=>{
        console.error(error);
      })
  }


  objectiveShow(){
    this.show=true;
  } 

  objectiveHide(){
    // console.log('objective hide',this.show);
    this.show = false
    // console.log('objective hide',this.show);
    
  
  }

}
