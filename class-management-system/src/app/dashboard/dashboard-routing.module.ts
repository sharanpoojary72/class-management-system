// dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeDashboardComponent, // Default route for the dashboard
  },
  {
    path: 'student',
    component: StudentDashboardComponent, // Route for the student dashboard
    canActivate: [AuthGuard],
    data: { role: 'student' }
  },
  {
    path: 'teacher',
    component: TeacherDashboardComponent, // Route for the teacher dashboard
    canActivate: [AuthGuard],
    data: { role: 'teacher' }
  },
  {
    path: 'admin',
    component: AdminDashboardComponent, // Route for the admin dashboard
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }