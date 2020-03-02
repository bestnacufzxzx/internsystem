import { Component, OnInit,Injectable } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Usermodule } from '../usermodule';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
// import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  dtOptions: Promise<DataTables.Settings>;
  userdet: Usermodule;
  search: Usermodule;
  data:number;
  form: FormGroup;
  //Datepicker
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  
  sum_year:number;
  sum_month:number;
  sum_day:number;
  fromDatetotal:string;
  toDatetotal:string;
  sum:number;
  year_month_day:string;
  
  
  BLOOD :any;
  CITIZEN_ID :any;
  SEX :any;
  TITLE :any;
  FIRST_NAME :any;
  LAST_NAME :any;
  BIRTH_DATE :any;
  dpFromDate :any;
  dpToDate :any;
  testdate_day:any;

  blood = [
    {id: 1, name: 'เอ'},
    {id: 2, name: 'บี'},
    {id: 3, name: 'เอบี'},
    {id: 4, name: 'โอ'}
  ];

  sex = [
    {id: 1, name: 'ชาย'},
    {id: 2, name: 'หญิง'}
  ];

  title = [
    {id: 1, name: 'นาย'},
    {id: 2, name: 'นาง'},
    {id: 3, name: 'นางสาว'}
  ];

  page = [
    {id: 1, name: 'นาย'},
    {id: 2, name: 'นาง'},
    {id: 3, name: 'นางสาว'}
  ];

  constructor(private fb: FormBuilder, private dataService: DataserviceService,private router:Router, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
  }
   
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  
  ngOnInit() {
    this.search = new Usermodule();
    this.getuserdetails();
    this.clear();
    this.submitForm();
  }

  // converd_date(testdate_day){
    
  //   let date = testdate_day;
  //   var d = new Date(date),
  //   month = '' + (d.getMonth() + 1),
  //   day = '' + d.getDate(),
  //   year = d.getFullYear() + 543;
  //   if (month.length < 2) 
  //     month = '0' + month;
  //   if (day.length < 2) 
  //     day = '0' + day;
  //   testdate_day =   day+ "/" + month + "/" + year;
  //  console.log('testdate_day :',testdate_day);
  // return  testdate_day;
  // }



  clear(){
    this.search.CITIZEN_ID = undefined;
    this.search.FIRST_NAME = undefined;
    this.search.LAST_NAME = undefined;
    this.search.SEX = undefined;
    this.search.BLOOD = undefined;
    this.search.TITLE = undefined;
    this.search.dpFromDate = undefined;
    this.search.dpToDate = undefined;
  }

  btn_submit(){
    this.getseacrh()
  }

  getuserdetails()
  {
    this.dataService.getAllUsers()
    .subscribe( data => {
    this.userdet = data;
     console.log('test userMo :',this.userdet);
    });
  }

  getseacrh()
  {
    // this.chack_time();

    this.CITIZEN_ID = this.search.CITIZEN_ID;
    this.SEX = this.search.SEX;
    this.TITLE = this.search.TITLE;
    this.FIRST_NAME = this.search.FIRST_NAME;
    this.LAST_NAME = this.search.LAST_NAME;
    this.BLOOD = this.search.BLOOD;
    this.BIRTH_DATE = this.search.BIRTH_DATE;
    this.dpFromDate = this.search.dpFromDate;
    this.dpToDate = this.search.dpToDate;


    console.log(
      // this.CITIZEN_ID , "CITIZEN_ID" ,
      // this.SEX + "SEX" +
    //   this.TITLE + "TITLE" +
    //   this.FIRST_NAME + "FIRST_NAME" +
    //   this.LAST_NAME + "LAST_NAME" +
      // this.BLOOD + "BLOOD" +
    //   this.BIRTH_DATE + "BIRTH_DATE" +
      // this.dpFromDate + "dpFromDate" +
      // this.dpToDate + "dpToDate" 
    )
    
    // if(this.dpFromDate == null || this.dpFromDate == undefined){
    //   this.dpFromDate = undefined;
    //   this.dpToDate = undefined;
    // }else{
    //  this.chack_fromDate(this.dpFromDate);
    //  this.chack_dptoDate(this.dpToDate);
    // }
    // console.log(this.dpFromDate, "", this.dpToDate);
    this.dataService.getseacrh(this.CITIZEN_ID, this.SEX, this.TITLE, this.FIRST_NAME, this.LAST_NAME, this.BLOOD, this.BIRTH_DATE, this.dpFromDate, this.dpToDate)
    .subscribe( data => {
    this.userdet = data;
    });
  }

  chack_fromDate(dpFromDate){
      let date = dpFromDate;
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;
      if(month <= '10'){}
      this.dpFromDate =  year + "-" + month + "-" + day;
     console.log('dpFromDate :',dpFromDate);
    return  dpFromDate;
    
  }
  chack_dptoDate(dpToDate){
    let date = dpToDate;
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
    this.dpToDate =  year + "-" + month + "-" + day;
   console.log('dpToDate :',dpToDate);
  return  dpToDate;
  }
  
  // chack_time(){
  //   var test = '';
  //   var startDate = this.search.dpFromDate.valueOf();
  //   var endDate = this.search.dpToDate.valueOf()
  //   var milisecondsDiff = endDate - startDate;
  //   // console.log(Math.floor(milisecondsDiff/(1000*60*60)).toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + (Math.floor(milisecondsDiff/(1000*60))%60).toLocaleString(undefined, {minimumIntegerDigits: 2})  + ":" + (Math.floor(milisecondsDiff/1000)%60).toLocaleString(undefined, {minimumIntegerDigits: 2}) 
  //   test = Math.floor(milisecondsDiff/(1000*60*60)).toLocaleString(undefined, {minimumIntegerDigits: 2})
  //   return this.test(test),this.varidate_datepiker(test);
    
  // }
  // varidate_datepiker(test){
  //   if(test ){
      
  //   }

  // }

  test(test:any){
    console.log(test);
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    let sum = ''
    checkArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        }
        sum =  item.value[0]+","
    });
    localStorage.setItem('sum', sum)
    
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  submitForm() {
    let sum = ''
    console.log(this.form.value)
    this.form.value.checkArray.forEach((ID: FormControl) => {
      this.deleteuserdetails(ID)
    });
  }

deleteuserdetails(ID)
{
  this.dataService.removeEmployee(ID).subscribe()
}

updatehistoryUser(user: Usermodule): void {
  window.localStorage.removeItem("editId");
  window.localStorage.setItem("editId", user.ID.toString());
  this.router.navigate(['edituser']);
};
addUser(): void {
  this.router.navigate(['add']);
};
}