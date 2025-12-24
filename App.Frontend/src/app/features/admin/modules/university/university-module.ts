import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppTranslateModule } from '../../../../shared/modules/app-translate.module';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '../../../../core/services/configuration/app-translate.service';
import { UniversityRoutingModule } from './university-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UniversityRoutingModule,
    AppTranslateModule.forChild('admin/university.json'),
  ],
})
export class UniversityModule {
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
