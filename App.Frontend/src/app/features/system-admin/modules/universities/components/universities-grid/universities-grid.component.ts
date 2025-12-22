import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UniversityResponse } from '../../../../../../core/models/university/responses/university-response';
import { ErrorHandlerService } from '../../../../../../core/services/configuration/error-handler.service';
import { SweetAlertService } from '../../../../../../core/services/configuration/sweet-alert.service';
import { UnivsersityService } from '../../../../../../core/services/university/univsersity-service.service';

@Component({
  selector: 'app-universities-grid',
  standalone: false,
  templateUrl: './universities-grid.component.html',
  styleUrl: './universities-grid.component.css',
})
export class UniversitiesGridComponent implements OnInit {
  universities$!: Observable<UniversityResponse[]>;
  includeDisabled: boolean = false;
  constructor(
    private universityService: UnivsersityService,
    private errorHandler: ErrorHandlerService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.loadUniversities();
  }
  trackById(index: number, item: any) {
    return item.id;
  }

  async delete(id: number) {
    const confirmed = await this.sweetAlertService.danger(
      'delete university',
      'are you sure'
    );
    if (confirmed) {
      this.toggleStatus(id);
    }
  }
  async restore(id: number) {
    const confirmed = await this.sweetAlertService.warn(
      'restore university',
      'are you sure'
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
