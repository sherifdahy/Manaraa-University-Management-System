import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';
import { authGuard } from './core/guards/auth-guard';
import { Role } from './core/enums/role.enum';
import { hasRoleGuard } from './core/guards/has-role-guard';

const routes: Routes = [
  {
    path : '',
    loadChildren : () => import('./features/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path : 'auth',
    loadChildren : () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path : 'sis',
    canActivate : [authGuard],
    loadChildren : () => import('./features/sis/sis.module').then(m => m.SisModule)
  },
  {
    path : 'lms',
    canActivate : [authGuard],
    loadChildren : () => import('./features/lms/lms.module').then(m => m.LmsModule)
  },
  {
    path : 'system-admin',
    canActivate : [authGuard,hasRoleGuard],
    data : { 'required-role' : Role[Role.SystemAdmin] },
    loadChildren :()=> import('./features/system-admin/system-admin.module').then(x=>x.SystemAdminModule)
  },
  {
    path : 'admin',
    canActivate : [authGuard,hasRoleGuard],
    data : { 'required-role' : Role[Role.Admin] },
    loadChildren :()=> import('./features/admin/admin.module').then(x=>x.AdminModule)
  },
  {
    path : 'access-denied',
    component : AccessDeniedComponent,
  },
  {
    path : 'server-error',
    component : ServerErrorComponent,
  },
  {
    path : 'not-found',
    component : NotFoundComponent,
  },
  {
    path : '**',
    component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
