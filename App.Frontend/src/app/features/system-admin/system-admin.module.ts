import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SystemAdminLayoutComponent } from './layouts/system-admin-layout/system-admin-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { GetAllUniverstyComponent } from './components/get-all-universty/get-all-universty';
import { UniversityPageComponent } from './pages/university-page/university-page';
import { AddUniversityComponent } from './components/add-university-component/add-university-component.component';
import { UniversityFacultyPageComponent } from './pages/university-faculty-page/university-faculty-page.component';
import { EditUniversityComponent } from './components/edit-university-component/edit-university-component.component';
import { GetAllFacultiesComponent } from './components/get-all-faculties/get-all-faculties.component';
import { MangeFacultyComponent } from './components/mange-faculty/mange-faculty.component';

const routes: Routes = [
  {
    path: '',
    component: SystemAdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'university',
        component: UniversityPageComponent,
      },
      {
        path: 'university-faculty/:universityId',
        component: UniversityFacultyPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AddUniversityComponent,
    EditUniversityComponent,
  ],
  declarations: [
    // layouts
    SystemAdminLayoutComponent,

    // pages
    DashboardPageComponent,
    UniversityPageComponent,
    UniversityFacultyPageComponent,

    // components
    SidebarComponent,
    HeaderComponent,
    GetAllUniverstyComponent,
    GetAllFacultiesComponent,
    MangeFacultyComponent,
  ],
})
export class SystemAdminModule {}
