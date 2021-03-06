import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Usermodule } from '../usermodule';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
// import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {

  searchObj = {
    ConfigName: ""
    , ConfigDetailName: ""
    , Status: ""
  };
  // dtOptions: DataTables.Settings = {};
  // dtOptions: Promise<DataTables.Settings>;
  // dtTrigger = new Subject();

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
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
    this.setdtOptions();
    this.search = new Usermodule();
    this.submitForm();
    this.getseacrh();
  }

  setdtOptions(){
    this.dtOptions.columnDefs = [
    {targets: [ 8 ], searchable: !1, orderable: !1},
    {targets: [ 9 ], searchable: !1, orderable: !1},
    {targets: [ 1 ], searchable: !1, orderable: !1},
    {targets: [], visible: false}
];
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   // serverSide: true,
    //   // processing: true,
    //   ordering: false,
    //   searching: false
    //   // columns: [
    //   //   { data: 'CITIZEN_ID' },
    //   //   { data: 'SEX' },
    //   //   { data: 'TITLE' },
    //   //   { data: 'FIRST_NAME' },
    //   //   { data: 'LAST_NAME' },
    //   //   { data: 'BLOOD' },
    //   //   { data: 'BIRTH_DATE' }
    //   // ]

    // };
  }
  clear(){
    this.search.CITIZEN_ID = null;
    this.search.FIRST_NAME = null;
    this.search.LAST_NAME = null;
    this.search.SEX = null;
    this.search.BLOOD = null;
    this.search.TITLE = null;
    this.search.dpFromDate = null;
    this.search.dpToDate = null;
  }
  btn_submit(){
    this.getSearchData()
  }
                      

  async getseacrh(){
      this.CITIZEN_ID = this.search.CITIZEN_ID;
      this.SEX = this.search.SEX;
      this.TITLE = this.search.TITLE;
      this.FIRST_NAME = this.search.FIRST_NAME;
      this.LAST_NAME = this.search.LAST_NAME;
      this.BLOOD = this.search.BLOOD;
      this.BIRTH_DATE = this.search.BIRTH_DATE;
      this.dpFromDate = this.search.dpFromDate;
      this.dpToDate = this.search.dpToDate;
      
      if(this.dpFromDate == undefined || this.dpFromDate == undefined){
        this.dpFromDate = null;
        this.dpToDate = null;
      }else{
        this.chack_fromDate(this.dpFromDate);
        this.chack_dptoDate(this.dpToDate);
      }
      console.log(this.dpFromDate, "", this.dpToDate);
      await  this.dataService.getseacrh(this.CITIZEN_ID, this.SEX, this.TITLE, this.FIRST_NAME, this.LAST_NAME, this.BLOOD, this.dpFromDate, this.dpToDate)
      .subscribe( data => {
      this.userdet = data;
      this.chack(this.userdet);
      this.chack_Date(this.userdet);
      this.dtTrigger.next(this.clear);
    });
  }

  chack(data){
    let i = 1;
    let ar = [];
    data.forEach(element => {
      ar[i] = element.BIRTH_DATE
      i += 1
    });
    console.log(ar)
    return this.date(ar)
  }

  date(data){
    const nums = data;
    function compare(a, b) {
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    }
    nums.sort(compare);
    nums.forEach(element => {
      console.log(element);
    });
    console.log("-------------------------------------------------");
  }

  chack_Date(dpFromDate){
    let i = 1;
    let toto = []
    dpFromDate.forEach(element => {
      let date = element.BIRTH_DATE;
      let date2 ;
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;
      if(month <= '10'){}
      date2 =  year + "-" + month + "-" + day;
      toto[i] = date2
      i += 1
    });
      return this.date_date(toto);
  }

  date_date(data){
    const nums = data;
    function compare(a, b) {
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    }
    nums.sort(compare);
    nums.forEach(element => {
      console.log(element);
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
    if (dpFromDate != null){
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
  }
  chack_dptoDate(dpToDate){
    if(dpToDate != null){
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
  } 


  deleteuserdetails(ID)
  {
    this.dataService.removeEmployee(ID).subscribe()
    alert("ลบข้อมูลสำเร็จ")
    // this.router.navigate(['dashboard']); 
    window.location.reload();
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

  getSearchData(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getseacrh();
    });
  }

}