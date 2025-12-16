import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasPermissionGuard } from '../../../../core/guards/has-permission-guard';
import { RolesComponent } from './pages/roles/roles.component';
import { FormRoleComponent } from './pages/form-role-page/form-role.component';
import { Permissions } from '../../../../core/constants/permission-consts';

const routes: Routes = [
  {
    path: '',
    canActivate: [hasPermissionGuard],
    data: { 'required-permission': Permissions.roles.readRoles },
    component: RolesComponent
  },
  {
    path: 'create',
    canActivate: [hasPermissionGuard],
    data: { 'required-permission': Permissions.roles.createRoles },
    component: FormRoleComponent
  },
  {
    path: 'edit/:id',
    canActivate: [hasPermissionGuard],
    data: { 'required-permission': Permissions.roles.updateRoles },
    component: FormRoleComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class RolesRoutingModule { }
