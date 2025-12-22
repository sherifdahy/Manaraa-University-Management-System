import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UniversitiesPageComponent } from './modules/universities/pages/universities-page/universities-page.component';
import { UniversityDialogComponent } from './modules/universities/components/university-dialog/university-dialog.component';
import { FormUniversityPageComponent } from './modules/universities/pages/form-university-page/form-university-page.component';
import { AppTranslateModule } from '../../shared/modules/app-translate.module';
import { AppTranslateService } from '../../core/services/configuration/app-translate.service';
import { LayoutComponent } from './layouts/layout/layout.component';
import { TranslateService } from '@ngx-translate/core';
import { TableComponent } from './components/table/table.component';
import { UniversitiesGridComponent } from './modules/universities/components/universities-grid/universities-grid.component';
import { UniversityEditComponent } from './modules/universities/components/university-edit-component/university-edit-component.component';
import { FacultiesGridComponent } from './modules/universities/components/faculties-grid/faculties-grid.component';
import { FacultyDialogFormComponent } from './modules/universities/components/faculty-form/faculty-dialog-form.component';

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
        component: DashboardPageComponent,
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./modules/roles/roles.module').then((x) => x.RolesModule),
      },
      {
        path: 'universities',
        loadChildren: () =>
          import('./modules/universities/universities.module').then(
            (x) => x.UniversitiesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    AppTranslateModule.forChild('/system-admin/layout.json'),
    TableComponent,
  ],
  declarations: [
    // layouts
    LayoutComponent,
    UniversityDialogComponent,

    // pages
    DashboardPageComponent,
    UniversitiesPageComponent,
    FormUniversityPageComponent,
    UniversityEditComponent,
    FacultyDialogFormComponent,
    FacultiesGridComponent,

    // components
    SidebarComponent,
    HeaderComponent,

    UniversitiesGridComponent,
  ],
})
export class SystemAdminModule {
  constructor(
    private translateService: TranslateService,
    private appTranslateService: AppTranslateService
  ) {
    this.appTranslateService.language$.subscribe((lang) => {
      this.translateService.getTranslation(lang).subscribe((file) => {
        this.translateService.setTranslation(lang, file, true);
      });
    });
  }
}
