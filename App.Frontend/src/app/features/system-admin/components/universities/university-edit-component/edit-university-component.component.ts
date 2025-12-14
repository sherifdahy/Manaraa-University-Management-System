import { Component, OnInit, Input } from '@angular/core';
import {
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UniversityRequest } from '../../../../../core/models/university/requests/university-request';
import { UniversityResponse } from '../../../../../core/models/university/responses/university-response';
import { ErrorHandlerService } from '../../../../../core/services/configuration/error-handler.service';
import { UnivsersityService } from '../../../../../core/services/university/univsersity-service.service';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-edit-university-component',
  templateUrl: './university-edit-component.component.html',
  // styleUrls: ['./edit-university-component.component.css'],
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, SharedModule],
})
export class EditUniversityComponent implements OnInit {
  @Input() univsersityId: number = 0;
  form!: FormGroup;
  constructor(
    private universityService: UnivsersityService,
    private formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService
  ) {}
  ngOnInit() {
    this.buildForm();
    this.setUniversity();
  }

  Submit() {
    let request = this.form.value as UniversityRequest;
    console.log(request);

    alert('Call Edit End Point');
    // this.universityService.update(this.univsersityId, request).subscribe({
    //   next: () => {
    //     alert('success');
    //   },
    //   error: (errors) => {
    //     alert('fail');
    //     this.errorHandler.handleError(errors, '');
    //   },
    // });
  }

  private setUniversity() {
    this.universityService.get(this.univsersityId).subscribe({
      next: (response) => {
        this.setForm(response);
      },
    });
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

  private setForm(university: UniversityResponse) {
    this.form.patchValue(university);
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
