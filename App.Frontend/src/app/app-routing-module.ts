import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

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
    path : '**',
    component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
