import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { AppRoutingModule } from '../app-routing-module';

@NgModule({
  imports: [
    CommonModule,

  ],
  declarations: [
    ErrorComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  exports : [
    ErrorComponent,
  ]
})
export class SharedModule { }
