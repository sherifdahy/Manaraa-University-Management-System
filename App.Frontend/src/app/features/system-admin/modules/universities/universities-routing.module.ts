import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversitiesPageComponent } from './pages/universities-page/universities-page.component';
import { FormUniversityPageComponent } from './pages/form-university-page/form-university-page.component';

const routes: Routes = [
  {
    path: '',
    component: UniversitiesPageComponent,
  },
  {
    path: 'edit/:universityId',
    component: FormUniversityPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversitiesRoutingModule {}
