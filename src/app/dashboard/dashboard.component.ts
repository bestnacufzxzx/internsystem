import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Usermodule } from '../usermodule';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
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
  hoveredDate: NgbDate;

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
  
  fromDate: NgbDate;
  toDate: NgbDate;
  form: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataserviceService,private router:Router, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.form = this.fb.group({checkArray: this.fb.array([],[])}) 
  }
   

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
 


  ngOnInit() {
    this.search = new Usermodule();
    this.getuserdetails();
    // this.dtOptions['search']=false;
  }


  getuserdetails()
  {
    this.dataService.getAllUsers()
    .subscribe( data => {
    this.userdet = data;
     console.log('test userMo :',this.userdet);
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