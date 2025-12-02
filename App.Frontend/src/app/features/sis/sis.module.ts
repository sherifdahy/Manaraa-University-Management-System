import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SisLayoutComponent } from './layouts/sis-layout/sis-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authGuard } from '../../core/guards/auth-guard';

const routes : Routes = [
  {
    path : '',
    canActivate : [authGuard],
    component : SisLayoutComponent,
    children : [

    ]

  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SisLayoutComponent,
  ]
})
export class SisModule { }
