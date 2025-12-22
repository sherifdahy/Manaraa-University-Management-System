import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversitiesPageComponent } from './pages/universities-page/universities-page.component';
import { FormUniversityPageComponent } from './pages/form-university-page/form-university-page.component';
import { hasPermissionGuard } from '../../../../core/guards/has-permission-guard';
import { Permissions } from '../../../../core/constants/permission-consts';

const routes: Routes = [
  {
    path: '',
    component: UniversitiesPageComponent,
    canActivate: [hasPermissionGuard],
    data: { 'required-permission': Permissions.universities.readUniversities },
  },
  {
    path: 'edit/:universityId',
    component: FormUniversityPageComponent,
    canActivate: [hasPermissionGuard],
    data: { 'required-permission': Permissions.universities.readUniversities },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversitiesRoutingModule {}
