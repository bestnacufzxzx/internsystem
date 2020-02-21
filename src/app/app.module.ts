import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

import {FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { CreateuserComponent } from './createuser/createuser.component';
// import { EdituserComponent } from './edituser/edituser.component';
import { AdduserComponent } from './adduser/adduser.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EdithistoryuserComponent } from './edithistoryuser/edithistoryuser.component';
// import { AddusersComponent } from './addusers/addusers.component';
import { NgSelectModule } from '@ng-select/ng-select';

 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // RegistrationComponent,
    DashboardComponent,
    // CreateuserComponent,
    // EdituserComponent,
    AdduserComponent,
    EdithistoryuserComponent,
    // AddusersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }