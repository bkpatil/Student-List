import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  private var_one:string;
  private studentSubscribe : any;
  private studentList:any;
  private display='none'; 
  private addEditStudentForm;
  private isEditStudent=false;
  private frmTitle="";
  private btnText="";
  constructor(private _service: StudentService,private router:Router) { 

  }

  public AddNewStudent(){
    this.frmTitle="Add Student";
    this.btnText="Save";
    this.isEditStudent=false;
     this.openModalDialog();
 };
//  public DeleteStudent(id){
//   var temp=confirm("Do you to remove this member?");
//   if(temp)
//   {
//     var obj={
//       m_id:id
//     }
//     this._service.deleteStudent(obj).subscribe(this._successDeleteCallback, this._errorCallback);
//   }
// };
public EditStudent(id){
  var student=this.studentList.find(s=>s.s_id==id);
  this.addEditStudentForm.setValue(student);
  this.frmTitle="Edit Student";
  this.btnText="Update";
  this.isEditStudent=true;
 this.openModalDialog();
};
 public _successCallback = (res): any => {
     this.studentList = res;
 }; 
 public _successInsertCallback = (res): any => {
    this.closeModalDialog();
    alert("Student Added Successfylly !!")
    this._service.getStudent().subscribe(this._successCallback, this._errorCallback);
};
// public _successDeleteCallback = (res): any => {
//     alert("Student Deleted Successfylly !!")
//     this._service.getStudent().subscribe(this._successCallback, this._errorCallback);
// };
 public _errorCallback = (err : HttpErrorResponse) : any => {
     if(err.error instanceof Error) {
         console.log("Client Side Error!");
     } else {
         console.log("Server side error..!");
     }
 };

 public openModalDialog(){
    this.display='block'; //Set block css
}
public closeModalDialog(){
this.display='none'; //set none css after close dialog
this.addEditStudentForm.reset();
}
 // Model Driven Form - login
 mdfLogin(data) {
   if(this.isEditStudent){
    this._service.updateStudent(data).subscribe(this._successInsertCallback, this._errorCallback);
   }else{
    this._service.insertStudent(data).subscribe(this._successInsertCallback, this._errorCallback);
   }
}
  ngOnInit() {
    this.studentSubscribe = this._service.getStudent().subscribe(this._successCallback, this._errorCallback);
    this.addEditStudentForm = new FormGroup({
      _id: new FormControl(
      ),
      s_id: new FormControl('',[
        Validators.minLength(1),
        Validators.required]
        ),
      s_name: new FormControl('', [
           Validators.minLength(1),
           Validators.required]),
      s_number: new FormControl('', [
            Validators.minLength(1),
            Validators.required]),
      s_status: new FormControl('', [
            Validators.minLength(1),
            Validators.required]),
    });
  }

}
