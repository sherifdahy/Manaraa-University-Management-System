import { Component, OnInit } from '@angular/core';
import { UniversityResponse } from '../../../../../core/models/university/responses/university-response';
import { UnivsersityService } from '../../../../../core/services/university/univsersity-service.service';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../../../../../core/services/configuration/error-handler.service';
import { SweetAlertService } from '../../../../../core/services/configuration/sweet-alert.service';

@Component({
  selector: 'app-universities-grid',
  standalone: false,
  templateUrl: './universities-grid.component.html',
  styleUrl: './universities-grid.component.css',
})
export class UniversitiesGridComponent implements OnInit {
  values$!: Observable<UniversityResponse[]>;

  constructor(
    private universityService: UnivsersityService,
    private errorHandler: ErrorHandlerService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.assignValues();
  }
  trackById(index: number, item: any) {
    return item.id;
  }

  async delete(id: number) {
    const confirmed = await this.sweetAlertService.warning(
      'delete university',
      'are you sure'
    );
    if (confirmed) {
      this.universityService.toggleStatus(id).subscribe({
        next: () => {
          this.deleteSuccess();
        },
        error: (errors) => this.deleteFail(errors),
      });
    }
  }

  private assignValues() {
    this.values$ = this.universityService.getAll();
  }
  private deleteSuccess() {
    this.assignValues();
  }
  private deleteFail(errors: any) {
    this.errorHandler.handleError(errors, '');
  }
}
