import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';


const routes : Routes = [
  {
    path : '',
    component : LandingLayoutComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

],
  declarations: [
    // layouts
    LandingLayoutComponent,


    // components

    // pages
  ]
})
export class LandingPageModule { }
