import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { guestGuard } from '../../core/guards/guest-guard';
import { ForgetPasswordFormComponent } from './components/forget-password-form/forget-password-form.component';
import { ForgetPasswordPageComponent } from './pages/forget-password-page/forget-password-page.component';
import { ModuleSeclectionForm } from './components/module-seclection-form/module-seclection-form';
import { ModuleSelectionPage } from './pages/module-selection-page/module-selection-page';
import { NewPasswordForm } from './components/new-password-form/new-password-form';
import { NewPasswordPage } from './pages/new-password-page/new-password-page';
import { SharedModule } from '../../shared/shared.module';
import { authGuard } from '../../core/guards/auth-guard';
import { AppTranslateModule } from '../../shared/modules/app-translate.module';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '../../core/services/configuration/app-translate.service';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [guestGuard],
      },
      {
        path: 'forget-password',
        component: ForgetPasswordPageComponent,
        canActivate: [guestGuard],
      },
      {
        path: 'new-password',
        component: NewPasswordPage,
        canActivate: [guestGuard],
        title: 'new password',
      },
      {
        path: 'module-selection',
        component: ModuleSelectionPage,
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    AppTranslateModule.forChild('/auth.json'),
    SharedModule,
  ],
  declarations: [
    // layouts
    AuthLayoutComponent,

    // components
    LoginFormComponent,
    ForgetPasswordFormComponent,
    ModuleSeclectionForm,
    NewPasswordForm,

    // pages
    LoginPageComponent,
    ForgetPasswordPageComponent,
    ModuleSelectionPage,
    NewPasswordPage,
  ],
})
export class AuthModule {
  constructor(private translateService: TranslateService, private appTranslateService: AppTranslateService) {
      this.appTranslateService.language$.subscribe(lang => {
        this.translateService.getTranslation(lang).subscribe(file => {
          this.translateService.setTranslation(lang, file, true);
        });
      })
    }
}
