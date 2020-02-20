import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from './authguard.guard';
import { AdduserComponent } from './adduser/adduser.component';
import { EdithistoryuserComponent } from './edithistoryuser/edithistoryuser.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: AdduserComponent,canActivate: [AuthguardGuard] },
  { path: 'edituser', component: EdithistoryuserComponent,canActivate: [AuthguardGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthguardGuard] }
 
]
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }