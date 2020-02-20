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
  // dtOptions: Promise<DataTables.Settings>;
  users: Usermodule[];
  data:number;
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  form: FormGroup;
  idcard ='';
  sex ='';
  blood ='';
  title ='';
  firstname ='';
  lastname ='';
  dpFromDate :any;
  dpToDate :any;
  testC :any;

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

  // isHovered(date: NgbDate) {
  //   return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  // }

  // isInside(date: NgbDate) {
  //   return date.after(this.fromDate) && date.before(this.toDate);
  // }

  // isRange(date: NgbDate) {
  //   return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  // }

  // validateInput(currentValue: NgbDate, input: string): NgbDate {
  //   const parsed = this.formatter.parse(input);
  //   return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  // }
 


  ngOnInit() {
    this.getuserdetails();
    // this.dtOptions['search']=false;
  }


  getuserdetails()
  {
    this.dataService.getAllUsers(this.data).subscribe(response =>
      {
        this.users = response.map(item =>
        {
          return new Usermodule(
              item.ID,
              item.CITIZEN_ID,
              item.TITLE,
              item.FIRST_NAME,
              item.LAST_NAME,
              item.SEX,
              item.BLOOD,
              item.BIRTH_DATE,
          );
        });
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
  this.dataService.removeEmployee(ID)
  .subscribe( data => {
    this.users = this.users.filter(u => u !== ID);
    this.getuserdetails();
    console.log(ID);
  })
  
}

// deleteuserdetails(user:Usermodule)
// {
//   this.dataService.removeEmployee(user.CITIZEN_ID)
//   .subscribe( data => {
//     //this.users = this.users.filter(u => u !== user);
//     this.getuserdetails();
//   })
 
// }
// updateUser(user: Usermodule): void {
//   window.localStorage.removeItem("editId");
//   window.localStorage.setItem("editId", user.CITIZEN_ID.toString());
//   this.router.navigate(['edit']);
// };
updatehistoryUser(user: Usermodule): void {
  window.localStorage.removeItem("editId");
  window.localStorage.setItem("editId", user.ID.toString());
  this.router.navigate(['edituser']);
};
addUser(): void {
  this.router.navigate(['add']);
};
}