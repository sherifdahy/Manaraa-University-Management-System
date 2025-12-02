import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewPasswordRequest } from '../../../../core/models/auth/requests/new-password-request';
import { ActivatedRoute, Router } from '@angular/router';
import { RegexPatternConsts } from '../../../../core/constants/regex-pattern-consts';
import { passwordMatch } from '../../../../shared/validators/password-match-validator';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-password-form',
  standalone: false,
  templateUrl: './new-password-form.html',
  styleUrl: './new-password-form.css',
})
//TODO
//2.Handel Errors (Backend Erros)
//4.AutoMapping in the request
//5.use the apperror
//route the new password
export class NewPasswordForm implements OnInit {
  form!: FormGroup;
  code!: string;
  email!: string;
  constructor(
    private formBuilder: FormBuilder,
    private activeatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.buildForm();
    this.setCode();
    this.setEmail();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request = this.form.value as NewPasswordRequest;
    this.callEndPoint(request);
  }
  private buildForm() {
    this.form = this.formBuilder.group(
      {
        newPassword: [
          '',
          [Validators.required, Validators.pattern(RegexPatternConsts.PASSWORD_PATTERN)],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatch() }
    );
  }
  private setCode() {
    this.activeatedRoute.queryParamMap.subscribe((params) => {
      this.code = params.get('code') ?? '';
    });
  }
  private setEmail() {
    this.activeatedRoute.queryParamMap.subscribe((params) => {
      this.email = params.get('email') ?? '';
    });
  }
  private callEndPoint(request: NewPasswordRequest) {
    request.code = this.code;
    request.email = this.email;
    this.authService.resetPassword(request).subscribe({
      next: () => this.submitSuccess(),
      error: (error: any) => this.submitFail(error),
    });
  }
  private submitSuccess() {
    this.toastrService.success('new Password Has Change');
    this.router.navigate(['/auth/login']);
  }
  private submitFail(error: any) {
    this.toastrService.error('error');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
