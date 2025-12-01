import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordRequest } from '../../../../core/models/auth/requests/forget-password-request';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forget-password-form',
  standalone: false,
  templateUrl: './forget-password-form.component.html',
  styleUrls: ['./forget-password-form.component.css'],
})

//TODO
//1.Use Toastr
//2.Handel Errors (Backend Erros)
//3.Complete the new PasswordComponent Logic
export class ForgetPasswordFormComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  get email() {
    return this.form.get('email');
  }

  onSubmit() {
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
    alert('Email Send Successfully');
  }
  private submitFail(error: any) {
    alert(error);
  }
}
