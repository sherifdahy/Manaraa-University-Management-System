import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordRequest } from '../../../../core/models/auth/requests/forget-password-request';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-forget-password-form',
  standalone: false,
  templateUrl: './forget-password-form.component.html',
  styleUrls: ['./forget-password-form.component.css'],
})

//TODO
//1.Use Toastr and remove this alerts
//2.Handel Errors (Backend Erros)
//3.see now where to go after success
//4.remove the [disable] from the Html
//5.use the apperror
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

  get email() {
    return this.form.get('email');
  }
}
