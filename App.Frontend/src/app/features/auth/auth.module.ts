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
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { ModuleSeclectionForm } from './components/module-seclection-form/module-seclection-form';
import { ModuleSelectionPage } from './pages/module-selection-page/module-selection-page';
import { NewPasswordForm } from './components/new-password-form/new-password-form';
import { NewPasswordPage } from './pages/new-password-page/new-password-page';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [guestGuard]
      },
      {
        path : 'forget-password',
        component : ForgetPasswordPageComponent,
        canActivate : [guestGuard],
      },
      {
        path : 'reset-password',
        component : ResetPasswordPageComponent,
        canActivate : [guestGuard]
      },
      {
        path : 'new-password',
        component : NewPasswordPage ,
        canActivate : [guestGuard],
        title:'new password'
      },
      {
        path : 'module-selection',
        component : ModuleSelectionPage,
        canActivate : [guestGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    // layouts
    AuthLayoutComponent,

    // components
    LoginFormComponent,
    ForgetPasswordFormComponent,
    ResetPasswordFormComponent,
    ModuleSeclectionForm,
    NewPasswordForm,


    // pages
    LoginPageComponent,
    ForgetPasswordPageComponent,
    ResetPasswordPageComponent,
    ModuleSelectionPage,
    NewPasswordPage
  ]
})
export class AuthModule { }
