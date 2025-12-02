import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordRequest } from '../../../../core/models/auth/requests/forget-password-request';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password-form',
  standalone: false,
  templateUrl: './forget-password-form.component.html',
  styleUrls: ['./forget-password-form.component.css'],
})

//TODO
//2.Handel Errors (Backend Erros)
//5.use the apperror
export class ForgetPasswordFormComponent implements OnInit {
  sucMsg:boolean=false;

  form!: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request = this.form.value as ForgetPasswordRequest;
    this.callEndPoint(request);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }
  private callEndPoint(request: ForgetPasswordRequest) {
    this.authService.forgetPassword(request).subscribe({
      next: () => this.submitSuccess(),
      error: (error: any) => this.submitFail(error),
    });
  }

  private submitSuccess() {
    this.toastrService.success('Email Send Successfully');
    this.sucMsg=true;
    this.cdr.detectChanges();
  }
  private submitFail(error: any) {
    this.toastrService.error('error');
  }

  get email() {
    return this.form.get('email');
  }
}
