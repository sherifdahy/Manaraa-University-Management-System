import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SystemAdminLayoutComponent } from './layouts/system-admin-layout/system-admin-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

const routes : Routes = [
  {
    path : '',
    component : SystemAdminLayoutComponent,
    children : [
      {
        path : 'dashboard',
        component : DashboardPageComponent,
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    // layouts
    SystemAdminLayoutComponent,

    // pages
    DashboardPageComponent,

    // components
    SidebarComponent,
    HeaderComponent,
  ]
})
export class SystemAdminModule { }
