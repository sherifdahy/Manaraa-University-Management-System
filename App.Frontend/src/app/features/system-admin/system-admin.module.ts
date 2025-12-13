import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SystemAdminLayoutComponent } from './layouts/system-admin-layout/system-admin-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { hasPermissionGuard } from '../../core/guards/has-permission-guard';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RolesGridComponent } from "./components/roles/roles-grid/roles-grid.component";
import { RoleCardComponent } from './components/roles/role-card/role-card.component';
import { Permissions } from '../../core/constants/permission-consts';
import { RolesComponent } from './pages/roles/roles/roles.component';
import { FormRoleComponent } from './pages/roles/create-role-page/form-role.component';
import { SharedModule } from "../../shared/shared.module";

const routes : Routes = [
  {
    path : '',
    component : SystemAdminLayoutComponent,
    children : [
      {
        path : '',
        redirectTo : 'dashboard',
        pathMatch : 'full'
      },
      {
        path : 'dashboard',
        component : DashboardPageComponent,
      },
      {
        path : 'roles',
        children : [
          {
            path : '',
            canActivate : [hasPermissionGuard],
            data : { 'required-permission' : Permissions.roles.readRoles},
            component : RolesComponent
          },
          {
            path : 'create',
            canActivate : [hasPermissionGuard],
            data : { 'required-permission' : Permissions.roles.createRoles},
            component : FormRoleComponent
          },
          {
            path : 'edit/:id',
            canActivate : [hasPermissionGuard],
            data : { 'required-permission' : Permissions.roles.updateRoles},
            component : FormRoleComponent
          },
        ]
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
],
  declarations: [
    // layouts
    SystemAdminLayoutComponent,

    // pages
    DashboardPageComponent,
    RolesComponent,
    FormRoleComponent,

    // components
    SidebarComponent,
    HeaderComponent,
    RolesGridComponent,
    RoleCardComponent,
  ]
})
export class SystemAdminModule { }
