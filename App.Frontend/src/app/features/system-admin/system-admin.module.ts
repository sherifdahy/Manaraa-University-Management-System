import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SystemAdminLayoutComponent } from './layouts/system-admin-layout/system-admin-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { hasPermissionGuard } from '../../core/guards/has-permission-guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesGridComponent } from "./components/roles/roles-grid/roles-grid.component";
import { RoleCardComponent } from './components/roles/role-card/role-card.component';
import { Permissions } from '../../core/constants/permission-consts';
import { RolesComponent } from './pages/roles/roles/roles.component';
import { FormRoleComponent } from './pages/roles/create-role-page/form-role.component';
import { SharedModule } from "../../shared/shared.module";
import { UniversitiesPageComponent } from './pages/universities/universities-page/universities-page.component';
import { UniversityDialogComponent } from './components/universities/university-dialog-component/university-dialog.component';
import { UniversitiesGridComponent } from './components/universities/universities-grid/universities-grid.component';
import { FormUniversityPageComponent } from './pages/universities/form-university-page/form-university-page.component';

const routes: Routes = [
  {
    path: '',
    component: SystemAdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'roles',
        children: [
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
        ]
      },
      {
        path: 'universities',
        children: [
          {
            path: '',
            component: UniversitiesPageComponent,
          },
          {
            path: 'edit/:universityId',
            component: FormUniversityPageComponent,
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
    UniversityDialogComponent,

    // pages
    DashboardPageComponent,
    RolesComponent,
    FormRoleComponent,
    UniversitiesPageComponent,
    FormUniversityPageComponent,

    // components
    SidebarComponent,
    HeaderComponent,
    RolesGridComponent,
    RoleCardComponent,
    UniversitiesGridComponent,
  ]
})
export class SystemAdminModule { }
