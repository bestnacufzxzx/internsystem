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

@Component({
  selector: 'app-edithistoryuser',
  templateUrl: './edithistoryuser.component.html',
  styleUrls: ['./edithistoryuser.component.css'],
  providers: []
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
  validate_CITIZEN_IDMIN: string;
  validate_CITIZEN_IDMAX: string;
  validate_CITIZEN_TEXT: string;
  
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
  chack_befor_validate(){
    this.Validators_TITLE();
    this.Validators_BLOOD();
    this.Validators_SEX();
    this.Validators_BIRTH_DATE();
    this.Validators_FIRST_NAME();
    this.Validators_LAST_NAME();
  }
  postdata()
  {
    this.chack_befor_validate();
    let num = new String(this.userEd.CITIZEN_ID);
    var CITIZEN_ID = this.Validators_CITIZEN_ID(this.userEd.CITIZEN_ID);
    var BIRTH_DATE = this.chack_BIRTH_Date(this.userEd.BIRTH_DATE)
    console.log(this.Validators_BIRTH_DATE())

    if( this.Validators_SEX() != false && this.Validators_TITLE() != false && this.Validators_BLOOD() != false && BIRTH_DATE != false && this.Validators_FIRST_NAME() != false && this.Validators_LAST_NAME() != false && CITIZEN_ID != false ){
      let updateby = localStorage.getItem('role');
      this.userEd.USER_NAME = updateby;
      this.dataService.edithistoryuser(this.userEd)
      .pipe(first())
      .subscribe(
          data => {
            this.router.navigate(['dashboard']); 
            alert("บันทึกสำเร็จ");
          },
          error => {
            alert("บันทึกไม่สำเร็จ");
            this.router.navigate(['edituser']);
          });
    }
  }
  chack_BIRTH_Date(BIRTH){
    if(BIRTH != null){
      let date = BIRTH;
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;
      this.userEd.BIRTH_DATE = ''
      this.userEd.BIRTH_DATE =  year + "-" + month + "-" + day;
      console.log('BIRTH :',BIRTH);
      return  BIRTH;
    }
    return false;
  }


  Validators_CITIZEN_ID(p_iPID){
    var p_iPID_x = p_iPID;
    let num = new String(p_iPID);
    if(this.userEd.CITIZEN_ID == undefined || this.userEd.CITIZEN_ID == '' || this.userEd.CITIZEN_ID == null){
      return this.validate_CITIZEN_TEXT = "กรุณากรอกเลขบัตรประชาชน",false ;
    } else if(num.length < 12 ) {
      return this.validate_CITIZEN_TEXT = "กรุณากรอกเลขประจำตัวประชาชนให้ครบถ้วน", false ;
    } else if( num.length == 13 ) {
        var total = 0;
        var iPID;
        var chk;
        let Validchk;
        iPID = p_iPID_x.replace(/-/g, "");
        Validchk = iPID.substr(12, 1);
        var j = 0;
        var pidcut;
        for (var n = 0; n < 12; n++) {
            pidcut = parseInt(iPID.substr(j, 1));
            total = (total + ((pidcut) * (13 - n)));
            j++;
        }
        chk = 11 - (total % 11);
    
        if (chk == 10) {
            chk = 0;
        } else if (chk == 11) {
            chk = 1;
        }
        if (chk == Validchk) {
            alert("กรอกเลขประจำตัวประชาชนถูกต้อง");
            return this.validate_CITIZEN_TEXT = '', true;
        } else {
          this.validate_CITIZEN_TEXT = "กรอกเลขประจำตัวประชาชนไม่ถูกต้อง"
          return false;
        }
    }
    
  }
  Validators_SEX(){
    if(this.userEd.SEX == undefined){
      return this.validate_SEX = "กรุณาเลือกเพศ" , false;
    }
    return this.validate_SEX = '', true;
  }
  Validators_TITLE(){
    if(this.userEd.TITLE == undefined){
      return this.validate_TITLE = "กรุณาเลือกคำนำหน้า" , false;
    }
    return this.validate_TITLE ='', true;
  }
  Validators_BLOOD(){
    if(this.userEd.BLOOD == undefined){
      return this.validate_BLOOD = "กรุณาเลือกหมู่โลหิต" , false;
    }
    return this.validate_BLOOD = '', true;
  }
  Validators_BIRTH_DATE(){
    if(this.userEd.BIRTH_DATE == undefined || this.userEd.BIRTH_DATE == null || this.userEd.BIRTH_DATE == ''){
      return this.validate_BIRTH_DATE = "กรุณาเลือกวันเกิด", false ;
    }
    return this.validate_BIRTH_DATE = '', true;
  }
  Validators_FIRST_NAME(){
    if(this.userEd.FIRST_NAME == undefined || this.userEd.FIRST_NAME == '' || this.userEd.FIRST_NAME == null){
      return this.validate_FIRST_NAME = "กรุณากรอกชื่อตัวไทย" , false;
    }
    return this.validate_FIRST_NAME = '', true;
  }
  Validators_LAST_NAME(){
    if(this.userEd.LAST_NAME == undefined || this.userEd.LAST_NAME == '' || this.userEd.LAST_NAME == null){
      return this.validate_LAST_NAME = "กรุณากรอกชื่อสกุลไทย", false;
    }
    return this.validate_LAST_NAME ='', true;
  }
}

