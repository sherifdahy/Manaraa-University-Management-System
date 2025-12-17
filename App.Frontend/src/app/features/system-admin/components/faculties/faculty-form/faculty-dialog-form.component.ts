import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyRequest } from '../../../../../core/models/faculty/requests/faculty-request';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';
import { ErrorHandlerService } from '../../../../../core/services/configuration/error-handler.service';
import { ToastrService } from 'ngx-toastr';
import { FacultyService } from '../../../../../core/services/faculty/faculty.service';
import { Subject, Subscription } from 'rxjs';
import { FacultyResponse } from '../../../../../core/models/faculty/responses/faculty-response';

@Component({
  selector: 'app-faculty-dialog-form',
  templateUrl: './faculty-dialog-form.component.html',
  styleUrls: ['./faculty-dialog-form.component.css'],
  standalone: false,
})
export class FacultyDialogFormComponent implements OnInit, OnDestroy {
  @Input() universityId: number = 0;
  @Input() editPressd$ = new Subject<number>();
  @ViewChild('dialog') dialog!: DialogComponent;
  @Output() facultySaved = new EventEmitter();
  facultyId: number = 0;
  form!: FormGroup;
  private sub!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private toastrService: ToastrService,
    private facultyService: FacultyService
  ) {}

  ngOnInit() {
    this.handelEdit();
    this.buildForm();
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request = this.form.value as FacultyRequest;
    request.universityId = this.universityId;
    if (this.facultyId != 0) {
      request.id = this.facultyId;
      this.callUpdateEndPoint(request);
    } else {
      this.callCreateEndPoint(request);
    }
    this.facultyId = 0;
  }

  private handelEdit() {
    let sub = this.editPressd$.subscribe({
      next: (id) => {
        this.facultyId = id;
        this.setFaculty(id);
      },
    });
  }

  private setFaculty(id: number) {
    this.facultyService.get(id).subscribe({
      next: (response) => {
        this.setForm(response);
      },
    });
  }

  private setForm(faculty: FacultyResponse) {
    this.dialog.open();
    this.form.patchValue(faculty);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      email: [
        '',
        [Validators.required, Validators.maxLength(200), Validators.email],
      ],
      website: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  private callUpdateEndPoint(request: FacultyRequest) {
    this.facultyService.update(request).subscribe({
      next: () => this.submitUpdateSuccess(),
      error: (errors) => this.submitFail(errors),
    });
  }

  private callCreateEndPoint(request: FacultyRequest) {
    this.facultyService.create(request).subscribe({
      next: () => this.submitCreateSuccess(),
      error: (errors) => this.submitFail(errors),
    });
  }

  private submitCreateSuccess() {
    this.closeDialog();
    this.toastrService.success('faculty added successfully');
  }
  private submitUpdateSuccess() {
    this.closeDialog();
    this.toastrService.success('faculty updated successfully');
  }
  private closeDialog() {
    this.facultySaved.emit();
    this.dialog.close();
  }

  private submitFail(errors: any) {
    this.errorHandler.handleError(errors, '');
  }
  get name(): any {
    return this.form.get('name');
  }

  get description(): any {
    return this.form.get('description');
  }

  get address(): any {
    return this.form.get('address');
  }
  get email(): any {
    return this.form.get('email');
  }
  get website(): any {
    return this.form.get('website');
  }
}
