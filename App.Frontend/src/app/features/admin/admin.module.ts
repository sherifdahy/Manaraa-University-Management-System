import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes : Routes = [
  {
    path : '',
    component : AdminLayoutComponent,
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
    AdminLayoutComponent,

    // pages
    DashboardPageComponent,

    // compoennts

  ]
})
export class AdminModule { }
