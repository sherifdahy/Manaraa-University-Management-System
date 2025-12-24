import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UniversityPageComponent } from './modules/university/pages/university-page/university-page.component';
import { FacultyDialogComponent } from './modules/university/components/faculty-dialog/faculty-dialog.component';
import { FacultyEditComponent } from './modules/university/components/faculty-edit/faculty-edit.component';
import { AppTranslateModule } from '../../shared/modules/app-translate.module';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '../../core/services/configuration/app-translate.service';

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
          import('./modules/university/university.module').then(
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
    AppTranslateModule.forChild('/admin/layout.json'),
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
export class AdminModule {
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
