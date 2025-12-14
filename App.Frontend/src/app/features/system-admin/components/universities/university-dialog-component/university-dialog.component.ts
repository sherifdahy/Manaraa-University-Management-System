import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UnivsersityService } from '../../../../../core/services/university/univsersity-service.service';
import { ErrorHandlerService } from '../../../../../core/services/configuration/error-handler.service';
import { UniversityRequest } from '../../../../../core/models/university/requests/university-request';

@Component({
  selector: 'app-university-dialog',
  standalone : false,
  templateUrl: './university-dialog.component.html',
  styleUrls: ['./university-dialog.component.css'],
})
export class UniversityDialogComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private universityService: UnivsersityService,
    private errorHandler: ErrorHandlerService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  Submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request = this.form.value as UniversityRequest;
    this.callEndPoint(request);
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

  private callEndPoint(request: UniversityRequest) {
    this.universityService.create(request).subscribe({
      next: (response) => this.submitSuccess(response.id),
      error: (errors) => this.submitFail(errors),
    });
  }

  private submitSuccess(id: number) {
    alert('here');
    this.closeModalBtn.nativeElement.click(); //closes modal
    this.toastrService.success('university add successfully');
    this.router.navigate(['system-admin/universities/edit', id]);
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
