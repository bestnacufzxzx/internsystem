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

  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {}
  onReset() {
      this.submitted = false;
  }
  
  ngOnInit() {

    this.userAdd = new Usermodule();
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
    console.log(this.userAdd.BLOOD);

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

