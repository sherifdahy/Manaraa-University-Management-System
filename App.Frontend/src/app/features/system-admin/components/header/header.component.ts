import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppTranslateService } from '../../../../core/services/configuration/app-translate.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../core/services/configuration/error-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone : false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'en'; // قيمة عادية مش Observable
  private langSub?: Subscription;

  constructor(
    private appTranslateService: AppTranslateService,
    private authService: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.langSub = this.appTranslateService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  changeLanguage(lang: string): void {
    this.appTranslateService.changeLanguage(lang);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: error => this.errorHandlerService.handleError(error, 'Logout failed')
    });
  }
}
