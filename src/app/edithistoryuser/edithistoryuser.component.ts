import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';
import {Usermodule} from '../usermodule'
// import { ValidationService } from 'src/app/Services/validation.service';
import {
  NgbDateAdapter,
  NgbDateStruct,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';


  fromModel(value: string): NgbDateStruct {
    let result: NgbDateStruct = null;
    if (value) {
      let date = value.split(this.DELIMITER);
      result = {
        year : parseInt(date[0], 10),
        day : parseInt(date[2], 10),
        month : parseInt(date[1], 10)
      };
    }
    return result;
  }

  toModel(date: NgbDateStruct): string {
    let result: string = null;
    if (date) {
      result = date.year + "-" + date.month + "-" + date.day;
    }
    return result;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct {
    let result: NgbDateStruct = null;
    if (value) {
      let date = value.split(this.DELIMITER);
      result = {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return result;
  }

  format(date: NgbDateStruct): string {
    let result: string = null;
    if (date) {
      result = date.day + this.DELIMITER + date.month + this.DELIMITER + date.year;
    }
    return result;
  }
}
@Component({
  selector: 'app-edithistoryuser',
  templateUrl: './edithistoryuser.component.html',
  styleUrls: ['./edithistoryuser.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EdithistoryuserComponent implements OnInit {

  submitted = false;
  userEd : Usermodule;

  validate_CITIZEN_ID: string;
  validate_SEX: string;
  validate_TITLE: string;
  validate_BLOOD: string;
  validate_BIRTH_DATE: string;
  validate_FIRST_NAME: string;
  validate_LAST_NAME: string;

  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {}
  onReset() {
      this.submitted = false;
  }
  
  ngOnInit() {
    let Id = window.localStorage.getItem("editId");

    console.log(Id);
    if(!Id) {
      this.router.navigate(['list-user']);
      return;
    }
    this.dataService.gethistoryUserId(+Id)
      .subscribe( data => {
      this.userEd = data;
       console.log('test userMo :',this.userEd);
      });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  postdata()
  {
    
    this.Validators_CITIZEN_ID();
    this.Validators_TITLE();
    this.Validators_BLOOD();
    this.Validators_SEX();
    this.Validators_BIRTH_DATE();
    this.Validators_FIRST_NAME();
    this.Validators_LAST_NAME();
    
    if(this.userEd.CITIZEN_ID != '' && this.userEd.TITLE != '' && this.userEd.SEX != '' && this.userEd.BLOOD != '' && this.userEd.BIRTH_DATE != '' && this.userEd.BIRTH_DATE !== null && this.userEd.FIRST_NAME != '' && this.userEd.LAST_NAME !=''){
      let updateby = localStorage.getItem('role');
      this.userEd.USER_NAME = updateby;
      this.dataService.edithistoryuser(this.userEd)
      .pipe(first())
      .subscribe(
          data => {
            // this.router.navigate(['dashboard']); 
            alert("บันทึกสำเร็จ");
  
          },
          error => {
            alert("บันทึกไม่สำเร็จ");
            // this.router.navigate(['dashboard']);
  
          });
    }
  }

  Validators_CITIZEN_ID(){
    if(this.userEd.CITIZEN_ID == ''){
      this.validate_CITIZEN_ID = '0';
      console.log("CITIZEN_ID",this.validate_CITIZEN_ID);
    }else{
      this.validate_CITIZEN_ID = '1';
    }
  }
  Validators_SEX(){
    if(this.userEd.SEX == ''){
      this.validate_SEX = '0'
    console.log("SEX",this.validate_SEX);
    }else{
      this.validate_SEX = '1';
    }
  }
  Validators_TITLE(){
    if(this.userEd.TITLE == ''){
      this.validate_TITLE = '0';
      console.log("TITLE",this.validate_TITLE);
    }else{
      this.validate_TITLE = '1';
    }
  }
  Validators_BLOOD(){
    if(this.userEd.BLOOD == ''){
      this.validate_BLOOD = '0';
      console.log("BLOOD",this.validate_BLOOD);
    }else{
      this.validate_BLOOD = '1';
    }
  }
  Validators_BIRTH_DATE(){
    if(this.userEd.BIRTH_DATE == '' || this.userEd.BIRTH_DATE == undefined){
      this.validate_BIRTH_DATE = '0';
      console.log("BIRTH_DATE",this.validate_BIRTH_DATE);
    }else{
      this.validate_BIRTH_DATE = '1';
    }
  }
  Validators_FIRST_NAME(){
    if(this.userEd.FIRST_NAME == ''){
      this.validate_FIRST_NAME = '0';
      console.log("FIRST_NAME",this.validate_FIRST_NAME);
    }else{
      this.validate_FIRST_NAME = '1';
    }
  }
  Validators_LAST_NAME(){
    if(this.userEd.LAST_NAME == ''){
      this.validate_LAST_NAME = '0';
      console.log("LAST_NAME",this.validate_LAST_NAME);
    }else{
      this.validate_LAST_NAME = '1';
    }
  }
}

