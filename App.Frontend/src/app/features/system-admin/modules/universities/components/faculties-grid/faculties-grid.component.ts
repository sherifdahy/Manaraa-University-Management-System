import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { FacultyResponse } from '../../../../../../core/models/faculty/responses/faculty-response';
import { ErrorHandlerService } from '../../../../../../core/services/configuration/error-handler.service';
import { SweetAlertService } from '../../../../../../core/services/configuration/sweet-alert.service';
import { FacultyService } from '../../../../../../core/services/faculty/faculty.service';
import { UnivsersityService } from '../../../../../../core/services/university/univsersity-service.service';
import { AuthService } from '../../../../../../core/services/auth/auth.service';
import { AuthenticatedUserResponse } from '../../../../../../core/models/auth/responses/authenticated-user-response';
import { Permissions } from '../../../../../../core/constants/permission-consts';
import { AppTranslateService } from '../../../../../../core/services/configuration/app-translate.service';

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
  currentUser: AuthenticatedUserResponse | null;
  permissions: any;
  private sub!: Subscription;

  constructor(
    private universityService: UnivsersityService,
    private facultyService: FacultyService,
    private errorHandler: ErrorHandlerService,
    private sweetAlert: SweetAlertService,
    private authService: AuthService,
    private appTranslateService: AppTranslateService
  ) {
    this.currentUser = this.authService.currentUser;
    this.permissions = Permissions;
  }

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
      this.appTranslateService.getValueSync('faculties.grid.deleteFaculty'),
      this.appTranslateService.getValueSync('faculties.grid.confirmDelete')
    );
    if (confirmed) {
      this.toggleStatus(id);
    }
  }

  async restore(id: number) {
    const confirmed = await this.sweetAlert.warn(
      this.appTranslateService.getValueSync('faculties.grid.restoreFaculty'),
      this.appTranslateService.getValueSync('faculties.grid.confirmRestore')
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
