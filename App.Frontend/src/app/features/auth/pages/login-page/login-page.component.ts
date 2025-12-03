import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTranslateModule } from '../../../../shared/modules/app-translate.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  standalone : false,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

  
}
