import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityPageComponent } from './pages/university-page/university-page.component';
import { FacultyEditComponent } from './components/faculty-edit/faculty-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UniversityPageComponent,
  },
  {
    path: 'faculty',
    component: FacultyEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversityRoutingModule {}
