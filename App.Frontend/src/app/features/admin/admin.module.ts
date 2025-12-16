import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes : Routes = [
  {
    path : '',
    component : AdminLayoutComponent,
    children : [
      {
        path : 'faculities',
        loadChildren:()=> import('./modules/faculty/faculty.module').then(x=>x.FacultyModule)
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

    // compoennts

  ]
})
export class AdminModule { }
