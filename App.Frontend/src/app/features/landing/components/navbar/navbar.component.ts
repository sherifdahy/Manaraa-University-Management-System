import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AppTranslateModule } from '../../../../shared/modules/app-translate.module';
import { AppTranslateService } from '../../../../core/services/configuration/app-translate.service';
import { ErrorHandlerService } from '../../../../core/services/configuration/error-handler.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentLanguage! : string;
  isLoggedIn!: boolean;

  constructor(
    private authService: AuthService,
    private appTranslateService: AppTranslateService,
    private errorHandlerService : ErrorHandlerService
  ) {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(response => {
      this.isLoggedIn = response;
    });

    this.appTranslateService.language$.subscribe(response=>{
      this.currentLanguage = response;
    })
  }

  logout() {
    this.authService.logout().subscribe({
      error: (errors) => {
        this.errorHandlerService.handleError(errors,'');
      }
    });
  }

  changeLanguage(lang:string)
  {
    this.appTranslateService.changeLanguage(lang);
  }
}
