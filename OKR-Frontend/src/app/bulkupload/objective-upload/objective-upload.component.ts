import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/apiCollection/api.service';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-objective-upload',
  templateUrl: './objective-upload.component.html',
  styleUrls: ['./objective-upload.component.css']
})
export class ObjectiveUploadComponent implements OnInit {

  myForm!:any;
  my_file:any = {};
  show=false;
  errorMsg:boolean = false;
  invalidType:boolean = false

  constructor( private toastr: ToastrService,private apiCall:ApiService) { }
  ngOnInit(): void {

  } 

  // for image update
  onChangeImage(event: any){
    let file: File = event.target.files[0];
    this.my_file = file
    console.log(this.my_file);
    
  }


    // show goal & milestone
    objectiveShow(){
      this.show=true;
    } 
  
    objectiveHide(){
      this.show = false
    }


  toCheckAndProceed(){
    var checklist = []
    // var result = Object.values(this.my_file);
    // var size = Object.keys(this.my_file).length;
    // console.log('this is',this.my_file);
    // checklist.push(this.my_file)
    console.log(this.my_file.size);
    
    if(this.my_file.size==null){
      this.errorMsg = true
      this.invalidType = false
    }
    else{
        if(
          this.my_file.type =='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  ||
          this.my_file.type =='application/vnd.ms-excel.sheet.binary.macroEnabled.12'  ||
          this.my_file.type =='application/vnd.ms-excel'  ||
          this.my_file.type =='application/vnd.ms-excel.sheet.macroEnabled.12'
        ){
          this.errorMsg = false
          this.invalidType = false
          this.objectiveShow();
        }
        else{
          this.invalidType = true
          this.errorMsg = false
        }
     
    }
  }

  onSubmit(){
    // console.log(this.my_file);
    this.apiCall.upload_objective(this.my_file).subscribe((result)=>{
      console.log(result);
      this.toastr.success("File upload has been upload Successfully...", 'Success');
      this.objectiveHide()
      
      },
      (error) => {
        console.error(error);
        this.toastr.error('Something went wrong!!!', 'Error!!!');
        this.objectiveHide()
      }
    );
  }

   


}



// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: 'dialog-content-example-dialog.html',
// })
// export class DialogContentExampleDialog {}