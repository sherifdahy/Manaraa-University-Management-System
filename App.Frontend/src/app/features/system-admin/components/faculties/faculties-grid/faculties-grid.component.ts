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
import { FacultyService } from '../../../../../core/services/faculty/faculty.service';
import { ErrorHandlerService } from '../../../../../core/services/configuration/error-handler.service';
import { SweetAlertService } from '../../../../../core/services/configuration/sweet-alert.service';
import { FacultyResponse } from '../../../../../core/models/faculty/responses/faculty-response';

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
  includeDisabled: boolean = false;
  faculties$!: Observable<FacultyResponse[]>;
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
        this.loadFaculties();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.universityId) return;
    this.loadFaculties();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  async delete(id: number) {
    const confirmed = await this.sweetAlert.danger(
      'delete faculty',
      'are you sure to delete faculty'
    );
    if (confirmed) {
      this.toggleStatus(id);
    }
  }

  async restore(id: number) {
    const confirmed = await this.sweetAlert.warn(
      'restore faculty',
      'are you sure to restore faculty'
    );
    if (confirmed) {
      this.toggleStatus(id);
    }
  }

  toggleStatus(id: number) {
    this.facultyService.toggleStatus(id).subscribe({
      next: () => {
        this.toggleStatusSuccess();
      },
      error: (errros) => {
        this.toggleStatusFail(errros);
      },
    });
  }

  edit(id: number) {
    this.editPressd.emit(id);
  }

  handleChangeIncludeDisabled() {
    this.loadFaculties();
  }

  private toggleStatusSuccess() {
    this.loadFaculties();
  }
  private loadFaculties() {
    this.faculties$ = this.facultyService.getAll(
      this.universityId,
      this.includeDisabled
    );
  }

  private toggleStatusFail(errors: any) {
    this.errorHandler.handleError(errors, '');
  }
}
