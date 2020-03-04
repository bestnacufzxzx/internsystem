import { Component, OnDestroy, OnInit,Injectable } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Usermodule } from '../usermodule';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
// import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {
  // dtOptions: DataTables.Settings = {};
  dtOptions: Promise<DataTables.Settings>;
  dtTrigger = new Subject();
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
  dpFromDate :string;
  dpToDate :string;
  //
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
  // this.dateAdapter.setLocale('th-TH');
  

  constructor(private fb: FormBuilder, private dataService: DataserviceService,private router:Router, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    // this.fromDate = undefined;
    // this.toDate = undefined;
    this.form = this.fb.group({checkArray: this.fb.array([],[])});
  }
  
  
  
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.sum_day = date.day;
      this.sum_month = date.month;
      this.sum_year = date.year + 543;
      
      this.fromDatetotal = this.sum_day + "-" + this.sum_month  + "-" + this.sum_year ;
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.sum_day = date.day;
      this.sum_month = date.month;
      this.sum_year = date.year + 543;

      this.toDatetotal = this.sum_day + "-" + this.sum_month  + "-" + this.sum_year ;
      this.toDate = date;

    } else {
      this.sum_day = date.day;
      this.sum_month = date.month;
      this.sum_year = date.year + 543;
      

      this.toDate = null;
      this.toDatetotal = null;
      this.fromDate = date;
      this.fromDatetotal = this.sum_day + "-" + this.sum_month  + "-" + this.sum_year ;

    }
    console.log("testest : "+this.fromDatetotal+"+++++++"+this.toDatetotal+"-----"+date)

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
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
    // this.getuserdetails();
    // this.dtOptions['search']=false;
    // CITIZEN_ID = this.search.TITLE ;
    this.submitForm();
    this.getseacrh();
  }

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
    // console.log(this.search.CITIZEN_ID);
    // console.log(this.search.BLOOD);
    // console.log(this.search.SEX);
    // console.log(this.search.TITLE);
    // console.log(this.search.FIRST_NAME);
    // console.log(this.search.LAST_NAME);
    // console.log(this.search.BLOOD);
    // console.log(this.search.BIRTH_DATE);
    // console.log(this.search.dpFromDate);
    // console.log(this.search.dpToDate);
  }

  // getuserdetails()
  // {
    // this.dataService.getAllUsers(CITIZEN_ID)
    // this.dataService.getAllUsers()
    // .subscribe( data => {
    // this.userdet = data;
    // this.dtTrigger.next();
    // console.log('test userMo :',this.userdet);
    // });
  // }

  getseacrh(){
    this.CITIZEN_ID = this.search.CITIZEN_ID;
    this.SEX = this.search.SEX;
    this.TITLE = this.search.TITLE;
    this.FIRST_NAME = this.search.FIRST_NAME;
    this.LAST_NAME = this.search.LAST_NAME;
    this.BLOOD = this.search.BLOOD;
    this.BIRTH_DATE = this.search.BIRTH_DATE;
    this.dpFromDate = this.search.dpFromDate;
    this.dpToDate = this.search.dpToDate;
    
    if(this.dpFromDate == null || this.dpFromDate == undefined){
      this.dpFromDate = undefined;
      this.dpToDate = undefined;
    }else{
     this.chack_fromDate(this.dpFromDate);
     this.chack_dptoDate(this.dpToDate);
    }
    console.log(this.dpFromDate, "", this.dpToDate);
    this.dataService.getseacrh(this.CITIZEN_ID, this.SEX, this.TITLE, this.FIRST_NAME, this.LAST_NAME, this.BLOOD, this.BIRTH_DATE, this.dpFromDate, this.dpToDate)
    .map(this.extractData)
    .subscribe( data => {
    this.userdet = data;
    this.dtTrigger.next();
    console.log('test search :',this.userdet);
    console.log('test dtTrigger :',this.dtTrigger.next());

    });
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: any) {
    // const body = res.json();
    return res;
  }

}