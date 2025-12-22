import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UniAdminComponent } from './components/pages/uni-admin/uni-admin.component';
import { UniSettingComponent } from './components/pages/uni-setting/uni-setting.component';
import { FacultyDialogComponent } from './components/faculty-dialog/faculty-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (x) => x.DashboardModule
          ),
      },
      {
        path: 'faculities',
        loadChildren: () =>
          import('./modules/faculty/faculty.module').then(
            (x) => x.FacultyModule
          ),
      },
      {
        path: 'uni-admin',
        component: UniAdminComponent,
      },
      {
        path: 'uni-setting',
        component: UniSettingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FacultyDialogComponent,
  ],
  declarations: [
    // layouts
    LayoutComponent,

    // pages
    UniAdminComponent,

    // compoennts
    HeaderComponent,
    SidebarComponent,
  ],
})
export class AdminModule {}
