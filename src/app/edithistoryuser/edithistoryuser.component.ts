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
    this.Validators_CITIZEN_ID();
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
    var ID_card = this.Validate_IDCrad(this.userEd.CITIZEN_ID);
    console.log(this.chack_BIRTH_Date(this.userEd.BIRTH_DATE))
    if( ID_card == true && num.length == 13 && this.userEd.CITIZEN_ID != undefined && this.userEd.CITIZEN_ID != null && this.userEd.CITIZEN_ID != '' && this.userEd.TITLE != undefined && this.userEd.SEX != undefined && this.userEd.BLOOD != undefined && this.chack_BIRTH_Date(this.userEd.BIRTH_DATE) != undefined && this.userEd.FIRST_NAME != undefined && this.userEd.LAST_NAME !=undefined){
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
            this.router.navigate(['edituser']);
  
          });
    }
  }

  chack_BIRTH_Date(BIRTH){
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

  Validate_IDCrad(p_iPID) {
    var total = 0;
    var iPID;
    var chk;
    let Validchk;
    iPID = p_iPID.replace(/-/g, "");
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
        alert("ระบุหมายเลขประจำตัวประชาชนถูกต้อง");
        return true;
    } else {
        alert("ระบุหมายเลขประจำตัวประชาชนไม่ถูกต้อง");
        return false;
    }
  }
  Validators_CITIZEN_ID(){
    let num = new String(this.userEd.CITIZEN_ID);
    // console.log(num)
    if(this.userEd.CITIZEN_ID == undefined || this.userEd.CITIZEN_ID == '' || this.userEd.CITIZEN_ID == null){
      this.validate_CITIZEN_ID = '0';
      console.log("CITIZEN_ID",this.validate_CITIZEN_ID);
    }else if(num.length < 12 && num != '' && num.length != 9){
      this.validate_CITIZEN_IDMIN = '2';
      console.log(num.length,this.validate_CITIZEN_IDMIN);
    }else if(num.length > 13){
      this.validate_CITIZEN_IDMAX = '3';
      console.log(num.length,this.validate_CITIZEN_IDMAX);
    }else{
      this.validate_CITIZEN_ID = '1';
    }
    
  }
  Validators_SEX(){
    if(this.userEd.SEX == undefined){
      this.validate_SEX = '0'
    console.log("SEX",this.validate_SEX);
    }else{
      this.validate_SEX = '1';
    }
  }
  Validators_TITLE(){
    if(this.userEd.TITLE == undefined){
      this.validate_TITLE = '0';
      console.log("TITLE",this.validate_TITLE);
    }else{
      this.validate_TITLE = '1';
    }
  }
  Validators_BLOOD(){
    if(this.userEd.BLOOD == undefined){
      this.validate_BLOOD = '0';
      console.log("BLOOD",this.validate_BLOOD);
    }else{
      this.validate_BLOOD = '1';
    }
  }
  Validators_BIRTH_DATE(){
    if(this.userEd.BIRTH_DATE == undefined || this.userEd.BIRTH_DATE == null || this.userEd.BIRTH_DATE == ''){
      this.validate_BIRTH_DATE = '0';
      console.log("BIRTH_DATE",this.validate_BIRTH_DATE);
    }else{
      this.validate_BIRTH_DATE = '1';
    }
  }
  Validators_FIRST_NAME(){
    if(this.userEd.FIRST_NAME == undefined || this.userEd.FIRST_NAME == '' || this.userEd.FIRST_NAME == null){
      this.validate_FIRST_NAME = '0';
      console.log("FIRST_NAME",this.validate_FIRST_NAME);
    }else{
      this.validate_FIRST_NAME = '1';
    }
  }
  Validators_LAST_NAME(){
    if(this.userEd.LAST_NAME == undefined || this.userEd.LAST_NAME == '' || this.userEd.LAST_NAME == null){
      this.validate_LAST_NAME = '0';
      console.log("LAST_NAME",this.validate_LAST_NAME);
    }else{
      this.validate_LAST_NAME = '1';
    }
  }
}

