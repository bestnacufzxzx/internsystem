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

