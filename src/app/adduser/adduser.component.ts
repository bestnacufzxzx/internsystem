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
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class AdduserComponent implements OnInit {

  BLOOD = [
      {id: 1, name: 'เอ'},
      {id: 2, name: 'บี'},
      {id: 3, name: 'เอบี'},
      {id: 4, name: 'โอ'}
  ];

  SEX = [
    {id: 1, name: 'ชาย'},
    {id: 2, name: 'หญิง'}
  ];

  TITLE = [
    {id: 1, name: 'นาย'},
    {id: 2, name: 'นาง'},
    {id: 3, name: 'นางสาว'}
  ];
  // selectedCity: any;
  
  submitted = false;
  userAdd : Usermodule;
  CITIZEN_ID: any;
  LAST_NAME: any;
  FIRST_NAME: any;
  BIRTH_DATE: any;
  validate_idcard: any;
  validate_CITIZEN_ID: string;
  validate_SEX: string;
  validate_TITLE: string;
  validate_BLOOD: string;
  validate_BIRTH_DATE: string;
  validate_FIRST_NAME: string;
  validate_LAST_NAME: string;
  validate_CITIZEN_IDMAX: string;
  validate_CITIZEN_IDMIN: string;
  // num:number;

  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {}
  onReset() {
      this.submitted = false;
  }
  
  ngOnInit() {
    this.userAdd = new Usermodule();
    // this.inOutvaridate();
  }
 

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  // inOutvaridate(){
  //   this.CITIZEN_ID;
  //   this.SEX;
  //   this.TITLE;
  //   this.BLOOD;
  //   this.BIRTH_DATE;
  //   this.FIRST_NAME;
  //   this.LAST_NAME;
  // //  console 
  // }

  postdata()
  {
    this.Validators_CITIZEN_ID();
    this.Validators_TITLE();
    this.Validators_BLOOD();
    this.Validators_SEX();
    this.Validators_BIRTH_DATE();
    this.Validators_FIRST_NAME();
    this.Validators_LAST_NAME();

    if(this.userAdd.CITIZEN_ID != undefined && this.userAdd.CITIZEN_ID != '' && this.userAdd.CITIZEN_ID != null && this.userAdd.TITLE != undefined && this.userAdd.SEX != undefined && this.userAdd.BLOOD != undefined && this.userAdd.BIRTH_DATE != undefined && this.userAdd.FIRST_NAME != undefined && this.userAdd.LAST_NAME !=undefined){
      let createby = localStorage.getItem('role');
      this.userAdd.CREATE_BY = createby;
      this.dataService.adduser(this.userAdd)
      .pipe(first())
      .subscribe(
          data => {
            // this.router.navigate(['dashboard']);
              // this.router.navigate(['login']);
              alert("บันทึกไม่สำเร็จ");
          },
          error => {
            alert("บันทึกสำเร็จ");
            // this.router.navigate(['dashboard']);
          });
    }
   
  }
  Validators_CITIZEN_ID(){
    var num = new String(this.userAdd.CITIZEN_ID);
    // console.log(num)
    if(this.userAdd.CITIZEN_ID == undefined || this.userAdd.CITIZEN_ID == '' || this.userAdd.CITIZEN_ID == null){
      this.validate_CITIZEN_ID = '0';
      console.log("CITIZEN_ID",this.validate_CITIZEN_ID);
    }
    else{
      this.validate_CITIZEN_ID = '1';
    }
    if(num.length <= 12  && num != ''){
      this.validate_CITIZEN_IDMIN = '2';
      console.log(num.length,this.validate_CITIZEN_IDMIN);
    }else if(num.length >= 14){
      this.validate_CITIZEN_IDMAX = '3';
      console.log(num.length,this.validate_CITIZEN_IDMAX);
    }
  }
  Validators_SEX(){
    if(this.userAdd.SEX == undefined){
      this.validate_SEX = '0'
    console.log("SEX",this.validate_SEX);
    }else{
      this.validate_SEX = '1';
    }
  }
  Validators_TITLE(){
    if(this.userAdd.TITLE == undefined){
      this.validate_TITLE = '0';
      console.log("TITLE",this.validate_TITLE);
    }else{
      this.validate_TITLE = '1';
    }
  }
  Validators_BLOOD(){
    if(this.userAdd.BLOOD == undefined){
      this.validate_BLOOD = '0';
      console.log("BLOOD",this.validate_BLOOD);
    }else{
      this.validate_BLOOD = '1';
    }
  }
  Validators_BIRTH_DATE(){
    if(this.userAdd.BIRTH_DATE == undefined || this.userAdd.BIRTH_DATE == null || this.userAdd.BIRTH_DATE == ''){
      this.validate_BIRTH_DATE = '0';
      console.log("BIRTH_DATE",this.validate_BIRTH_DATE);
    }else{
      this.validate_BIRTH_DATE = '1';
    }
  }
  Validators_FIRST_NAME(){
    if(this.userAdd.FIRST_NAME == undefined || this.userAdd.FIRST_NAME == '' || this.userAdd.FIRST_NAME == null){
      this.validate_FIRST_NAME = '0';
      console.log("FIRST_NAME",this.validate_FIRST_NAME);
    }else{
      this.validate_FIRST_NAME = '1';
    }
  }
  Validators_LAST_NAME(){
    if(this.userAdd.LAST_NAME == undefined || this.userAdd.LAST_NAME == '' || this.userAdd.LAST_NAME == null){
      this.validate_LAST_NAME = '0';
      console.log("LAST_NAME",this.validate_LAST_NAME);
    }else{
      this.validate_LAST_NAME = '1';
    }
  }
  // if(this.userAdd.CITIZEN_ID == undefined){
  //   this.validate_CITIZEN_ID = '';
  // }
  // if(this.userAdd.SEX == undefined){
  //   this.validate_SEX = '';
  // }
  // if(this.userAdd.TITLE == undefined){
  //   this.validate_TITLE = '';
  // }
  // if(this.userAdd.FIRST_NAME == undefined){
  //   this.validate_BLOOD = '';
  // }
  // if(this.userAdd.BIRTH_DATE == undefined){
  //   this.validate_BIRTH_DATE = '';
  // }
  // if(this.userAdd.FIRST_NAME == undefined){
  //   this.validate_FIRST_NAME = '';
  // }
  // if(this.userAdd.LAST_NAME == undefined){
  //   this.validate_LAST_NAME = '';
  // }
  // else{
  //   this.validate_CITIZEN_ID = this.userAdd.CITIZEN_ID;
  //   this.validate_SEX = this.userAdd.SEX;
  //   this.validate_TITLE = this.userAdd.TITLE;
  //   this.validate_BLOOD = this.userAdd.BLOOD;
  //   this.validate_BIRTH_DATE = this.userAdd.BIRTH_DATE;
  //   this.validate_FIRST_NAME = this.userAdd.FIRST_NAME;
  //   this.validate_LAST_NAME = this.userAdd.LAST_NAME;
  //   // console.log(this.userAdd.CITIZEN_ID);
  // }

}

