import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {
    this.angForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      // email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
 
    });
   }
 
   get f() { return this.angForm.controls; }

   onReset() {
       this.submitted = false;
       this.angForm.reset();
   }

  ngOnInit() {
  }
  postdata(angForm1:NgForm)
  {

    this.submitted = true;

    // stop here if form is invalid
    if (this.angForm.invalid) {
        return;
    }

    // display form values on success

    this.dataService.userlogin(angForm1.value.username,angForm1.value.password)
      .pipe(first())
      .subscribe(
          data => {
                const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
                this.router.navigate([redirect]);
                alert("ยินดีต้อนรับเข้าสู่ระบบ")
          },
          error => {
              alert("กรุณาตรวจสอบ ชื่อผู้ใช้งาน หรือ รหัสผ่าน ให้ถูกต้อง")
          });
  }
  get username() { return this.angForm.get('username'); }
  get password() { return this.angForm.get('password'); }
}