import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UnivsersityService } from '../../../../../core/services/university/univsersity-service.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { UniversityDetailResponse } from '../../../../../core/models/university/responses/university-detail-response';
import { FacultyService } from '../../../../../core/services/faculty/faculty.service';
import { ErrorHandlerService } from '../../../../../core/services/configuration/error-handler.service';
import { SweetAlertService } from '../../../../../core/services/configuration/sweet-alert.service';

@Component({
  selector: 'app-faculties-grid',
  templateUrl: './faculties-grid.component.html',
  styleUrls: ['./faculties-grid.component.css'],
  standalone: false,
})
export class FacultiesGridComponent implements OnInit, OnChanges, OnDestroy {
  @Input() universityId: number = 0;
  @Input() facultySaved$!: Subject<void>;
  @Output() editPressd = new EventEmitter<number>();
  universityDetail$!: Observable<UniversityDetailResponse>;
  private sub!: Subscription;

  constructor(
    private universityService: UnivsersityService,
    private facultyService: FacultyService,
    private errorHandler: ErrorHandlerService,
    private sweetAlert: SweetAlertService
  ) {}

  ngOnInit() {
    if (this.facultySaved$) {
      this.sub = this.facultySaved$.subscribe(() => {
        this.assignValues();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.universityId) return;
    this.assignValues();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  async delete(id: number) {
    const confirmed = await this.sweetAlert.warning(
      'delete faculty',
      'are you sure to delete faculty'
    );
    if (confirmed) {
      this.facultyService.toggleStatus(id).subscribe({
        next: () => {
          this.deleteSuccess();
        },
        error: (errros) => {
          this.deleteFail(errros);
        },
      });
    }
  }

  edit(id: number) {
    this.editPressd.emit(id);
  }
  private deleteSuccess() {
    this.assignValues();
  }
  private assignValues() {
    this.universityDetail$ = this.universityService.get(this.universityId);
  }

  private deleteFail(errors: any) {
    this.errorHandler.handleError(errors, '');
  }
}
