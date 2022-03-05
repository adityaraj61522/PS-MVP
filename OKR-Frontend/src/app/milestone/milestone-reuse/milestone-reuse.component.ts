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

  constructor(private apiData:ApiService) { }

  ngOnInit(): void {
       // call single user
       this.apiData.getSingleUser(this.goalId).subscribe((response)=>{
        this.singleUser= Object.values(response)[0];
        this.goal_name = Object.values(response)[0].goal_nam
        const firstval = this.apiData.convertToDate(Object.values(response)[0].goal_start_date)
        const secondval = this.apiData.convertToDate( new Date().toDateString())
        this.start_date = firstval > secondval?firstval:secondval;
        const end_date = this.apiData.convertToDate(Object.values(response)[0].goal_due_date)
      

        
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
