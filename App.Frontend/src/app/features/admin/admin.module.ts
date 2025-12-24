import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UniversityPageComponent } from './modules/university/pages/university-page/university-page.component';
import { FacultyDialogComponent } from './modules/university/components/faculty-dialog/faculty-dialog.component';
import { FacultyEditComponent } from './modules/university/components/faculty-edit/faculty-edit.component';

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
        path: 'university',
        loadChildren: () =>
          import('./modules/university/university-module').then(
            (x) => x.UniversityModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FacultyDialogComponent,
    FacultyEditComponent,
  ],
  declarations: [
    // layouts
    LayoutComponent,

    // pages
    UniversityPageComponent,

    // compoennts
    HeaderComponent,
    SidebarComponent,
  ],
})
export class AdminModule {}
