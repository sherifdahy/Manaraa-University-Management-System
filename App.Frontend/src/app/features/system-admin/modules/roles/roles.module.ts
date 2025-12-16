import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './pages/roles/roles.component';
import { SharedModule } from '../../../../shared/shared.module';
import { RolesGridComponent } from './components/roles-grid/roles-grid.component';
import { FormRoleComponent } from './pages/form-role-page/form-role.component';
import { RoleCardComponent } from './components/role-card/role-card.component';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslateModule } from '../../../../shared/modules/app-translate.module';
import { AppTranslateService } from '../../../../core/services/configuration/app-translate.service';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    AppTranslateModule.forChild('/system-admin/roles.json'),
    SharedModule
  ],
  declarations: [
    RolesComponent,
    RolesGridComponent,
    FormRoleComponent,
    RoleCardComponent
  ]
})
export class RolesModule {
  constructor(private translateService: TranslateService, private appTranslateService: AppTranslateService) {
    this.appTranslateService.language$.subscribe(lang => {
      this.translateService.getTranslation(lang).subscribe(file => {
        this.translateService.setTranslation(lang, file, true);
      });
    })
  }
}
