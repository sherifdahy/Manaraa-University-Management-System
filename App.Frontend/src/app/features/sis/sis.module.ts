import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SisLayoutComponent } from './layouts/sis-layout/sis-layout.component';

const routes : Routes = [
  {
    path : '',
    component : SisLayoutComponent,
    children : [
      {
        path : 'university-management',
        loadChildren : () => import('./modules/university-management/university-management.module').then(m => m.UniversityManagementModule)
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
    SisLayoutComponent,
  ]
})
export class SisModule { }
