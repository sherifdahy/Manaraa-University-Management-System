import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
import { UniversitiesPageComponent } from './pages/universities/universities-page/universities-page.component';
import { UniversityDialogComponent } from './components/universities/university-dialog/university-dialog.component';
import { UniversitiesGridComponent } from './components/universities/universities-grid/universities-grid.component';
import { FormUniversityPageComponent } from './pages/universities/form-university-page/form-university-page.component';
import { AppTranslateModule } from '../../shared/modules/app-translate.module';
import { AppTranslateService } from '../../core/services/configuration/app-translate.service';
import { LayoutComponent } from './layouts/layout/layout.component';
import { TranslateService } from '@ngx-translate/core';
import { UniversityEditComponent } from './components/universities/university-edit-component/university-edit-component.component';
import { FacultyDialogFormComponent } from './components/faculties/faculty-form/faculty-dialog-form.component';
import { FacultiesGridComponent } from './components/faculties/faculties-grid/faculties-grid.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

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
        loadChildren: () => import('./modules/roles/roles.module').then(x => x.RolesModule)
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
        ],
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
  constructor(private translateService: TranslateService, private appTranslateService: AppTranslateService) {
    this.appTranslateService.language$.subscribe(lang => {
      this.translateService.getTranslation(lang).subscribe(file => {
        this.translateService.setTranslation(lang, file, true);
      });
    })
  }
}
