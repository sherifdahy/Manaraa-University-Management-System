import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UniversityResponse } from '../../../../../../core/models/university/responses/university-response';
import { ErrorHandlerService } from '../../../../../../core/services/configuration/error-handler.service';
import { SweetAlertService } from '../../../../../../core/services/configuration/sweet-alert.service';
import { UnivsersityService } from '../../../../../../core/services/university/univsersity-service.service';
import { AuthService } from '../../../../../../core/services/auth/auth.service';
import { AuthenticatedUserResponse } from '../../../../../../core/models/auth/responses/authenticated-user-response';
import { Permissions } from '../../../../../../core/constants/permission-consts';
import { AppTranslateService } from '../../../../../../core/services/configuration/app-translate.service';

@Component({
  selector: 'app-universities-grid',
  standalone: false,
  templateUrl: './universities-grid.component.html',
  styleUrl: './universities-grid.component.css',
})
export class UniversitiesGridComponent implements OnInit {
  universities$!: Observable<UniversityResponse[]>;
  includeDisabled: boolean = false;
  currentUser: AuthenticatedUserResponse | null = null;
  permissions: any = null;
  constructor(
    private universityService: UnivsersityService,
    private errorHandler: ErrorHandlerService,
    private sweetAlertService: SweetAlertService,
    private authService: AuthService,
    private appTranslateService: AppTranslateService
  ) {
    this.currentUser = this.authService.currentUser;
    this.permissions = Permissions;
  }

  ngOnInit(): void {
    this.loadUniversities();
  }
  trackById(index: number, item: any) {
    return item.id;
  }

  async delete(id: number) {
    const confirmed = await this.sweetAlertService.danger(
      this.appTranslateService.getValueSync(
        'universities.grid.deleteUniversity'
      ),
      this.appTranslateService.getValueSync('universities.grid.confirmDelete')
    );
    if (confirmed) {
      this.toggleStatus(id);
    }
  }
  async restore(id: number) {
    const confirmed = await this.sweetAlertService.warn(
      this.appTranslateService.getValueSync(
        'universities.grid.restoreUniversity'
      ),
      this.appTranslateService.getValueSync('universities.grid.confirmRestore')
    );
    if (confirmed) {
      this.toggleStatus(id);
    }
  }
  toggleStatus(id: number) {
    this.universityService.toggleStatus(id).subscribe({
      next: () => {
        this.toggleStatusSuccess();
      },
      error: (errors) => this.toggleStatusFail(errors),
    });
  }

  handleChangeIncludeDisabled() {
    this.loadUniversities();
  }

  private loadUniversities() {
    this.universities$ = this.universityService.getAll(this.includeDisabled);
  }
  private toggleStatusSuccess() {
    this.loadUniversities();
  }
  private toggleStatusFail(errors: any) {
    this.errorHandler.handleError(errors, '');
  }
}
