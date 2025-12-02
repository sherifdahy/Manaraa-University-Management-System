import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewPasswordRequest } from '../../../../core/models/auth/requests/new-password-request';
import { ActivatedRoute } from '@angular/router';
import { RegexPatternConsts } from '../../../../core/constants/regex-pattern-consts';
import { passwordMatch } from '../../../../shared/validators/password-match-validator';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-new-password-form',
  standalone: false,
  templateUrl: './new-password-form.html',
  styleUrl: './new-password-form.css',
})
//TODO
//1.Use Toastr and remove this alerts
//2.Handel Errors (Backend Erros)
//3.see now where to go after success
//4.AutoMapping in the request
//6.remove the [disable] from the Html
//5.use the apperror
export class NewPasswordForm implements OnInit {
  form!: FormGroup;
  code!: string;
  email!: string;
  constructor(
    private formBuilder: FormBuilder,
    private activeatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.buildForm();
    this.setCode();
    this.setEmail();
  }

  onSubmit() {
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
    alert('new Password Has Change');
  }
  private submitFail(error: any) {
    alert(error);
    console.log(error);
  }

  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
