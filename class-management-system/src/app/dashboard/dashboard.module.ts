import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { RouterModule } from '@angular/router';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HomeDashboardComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
]
})
export class DashboardModule { }
