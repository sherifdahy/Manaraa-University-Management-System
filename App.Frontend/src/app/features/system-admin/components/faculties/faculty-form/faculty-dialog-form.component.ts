import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FacultyRequest } from '../../../../../core/models/faculty/requests/faculty-request';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';
import { ErrorHandlerService } from '../../../../../core/services/configuration/error-handler.service';
import { ToastrService } from 'ngx-toastr';
import { FacultyService } from '../../../../../core/services/faculty/faculty.service';

@Component({
  selector: 'app-faculty-dialog-form',
  templateUrl: './faculty-dialog-form.component.html',
  styleUrls: ['./faculty-dialog-form.component.css'],
  standalone: false,
})
export class FacultyDialogFormComponent implements OnInit {
  @Input() universityId: number = 0;
  form!: FormGroup;
  @ViewChild('dialog') dialog!: DialogComponent;
  constructor(
    private activeRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private toastrService: ToastrService,
    private facultyService: FacultyService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request = this.form.value as FacultyRequest;
    request.universityId = this.universityId;
    this.callEndPoint(request);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      deanName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      website: ['', [Validators.required]],
    });
  }
  private callEndPoint(request: FacultyRequest) {
    this.facultyService.create(request).subscribe({
      next: () => this.submitSuccess(),
      error: (errors) => this.submitFail(errors),
    });
  }

  private submitSuccess() {
    this.dialog.close(); //closes modal
    this.toastrService.success('university add successfully');
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
  get deanName(): any {
    return this.form.get('deanName');
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
