import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrialModule } from './modules/matrial.module';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatrialModule,
  ],
  declarations: [
    ErrorComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    ServerErrorComponent,
    DialogComponent,
  ],
  exports: [
    ErrorComponent,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    DialogComponent
  ]
})
export class SharedModule {
}
