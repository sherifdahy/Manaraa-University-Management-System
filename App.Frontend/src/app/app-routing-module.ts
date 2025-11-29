import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';
import { PortalSelectionComponent } from './shared/components/portal-selection/portal-selection.component';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path : '',
    loadChildren : () => import('./features/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path : 'auth',
    loadChildren : () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path : 'sis',
    loadChildren : () => import('./features/sis/sis.module').then(m => m.SisModule)
  },
  {
    path : 'lms',
    loadChildren : () => import('./features/lms/lms.module').then(m => m.LmsModule)
  },
  {
    path : 'protal-selection',
    canActivate : [authGuard],
    component : PortalSelectionComponent,
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
