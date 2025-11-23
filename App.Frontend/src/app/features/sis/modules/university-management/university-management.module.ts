import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniverstiesPageComponent } from './pages/universties-page/universties-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path : '',
    component : UniverstiesPageComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    UniverstiesPageComponent,
  ]
})
export class UniversityManagementModule { }
