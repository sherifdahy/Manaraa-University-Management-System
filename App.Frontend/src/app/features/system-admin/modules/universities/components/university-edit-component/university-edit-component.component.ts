import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UniversityRequest } from '../../../../../../core/models/university/requests/university-request';
import { UniversityDetailResponse } from '../../../../../../core/models/university/responses/university-detail-response';
import { ErrorHandlerService } from '../../../../../../core/services/configuration/error-handler.service';
import { UnivsersityService } from '../../../../../../core/services/university/univsersity-service.service';

@Component({
  selector: 'app-edit-university-component',
  standalone: false,
  templateUrl: './university-edit-component.component.html',
})
export class UniversityEditComponent implements OnInit {
  @Input() univsersityId: number = 0;

  form!: FormGroup;
  constructor(
    private universityService: UnivsersityService,
    private formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.setUniversity();
  }

  Submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.callEndPoint();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      address: ['', [Validators.required, Validators.maxLength(300)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(200)],
      ],
      website: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }
  private setUniversity() {
    this.universityService.get(this.univsersityId).subscribe({
      next: (response) => {
        this.setForm(response);
      },
    });
  }
  private setForm(university: UniversityDetailResponse) {
    this.form.patchValue(university);
  }
  private callEndPoint() {
    let request = this.form.value as UniversityRequest;
    request.id = this.univsersityId;
    this.universityService.update(request).subscribe({
      next: () => this.submitSuccess(),
      error: (errors) => this.submitFail(errors),
    });
  }

  private submitSuccess() {
    this.toastrService.success('data updated successfully');
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
