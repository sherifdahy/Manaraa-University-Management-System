import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewPasswordRequest } from '../../../../core/models/auth/requests/new-password-request';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password-form',
  standalone: false,
  templateUrl: './new-password-form.html',
  styleUrl: './new-password-form.css',
})
export class NewPasswordForm implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private activeatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.buildForm();
  }

  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  onSubmit() {
    let request = this.form.value as NewPasswordRequest;
    this.callEndPoint(request);
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  private callEndPoint(request: NewPasswordRequest) {
    request.code = 'code';
    alert('calling the Api');

    console.log(request);
  }
  private submitSuccess() {}
  private submitFail(error: any) {}
}
