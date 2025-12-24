import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversitiesRoutingModule } from './universities-routing.module';
import { AppTranslateModule } from '../../../../shared/modules/app-translate.module';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '../../../../core/services/configuration/app-translate.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UniversitiesRoutingModule,
    AppTranslateModule.forChild('/system-admin/universities.json'),
  ],
})
export class UniversitiesModule {
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
