import { Component, OnInit } from '@angular/core';
import { ResetPasswordFormComponent } from "../../components/reset-password-form/reset-password-form.component";

@Component({
  selector: 'app-reset-password-page',
  standalone : false,
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css'],
})
export class ResetPasswordPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
