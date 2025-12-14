import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppTranslateService } from '../../../../../core/services/configuration/app-translate.service';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../../core/services/configuration/error-handler.service';

interface CurrentUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'en';
  currentUser: CurrentUser | null = null;
  isLoggingOut = false;
  private destroy$ = new Subject<void>();

  constructor(
    private appTranslateService: AppTranslateService,
    private authService: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loadLanguage();
    this.loadCurrentUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load current language setting
   */
  private loadLanguage(): void {
    this.appTranslateService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLanguage = lang;
      });
  }

  /**
   * Load current user information
   */
  private loadCurrentUser(): void {
    // Get user from auth service
    this.currentUser = this.authService.currentUser as any;
  }

  /**
   * Change application language
   */
  changeLanguage(lang: string): void {
    if (lang && lang !== this.currentLanguage) {
      this.appTranslateService.changeLanguage(lang);
    }
  }

  /**
   * Get user initials for avatar
   */
  getInitials(): string {
    if (!this.currentUser?.name) return 'U';
    const names = this.currentUser.name.split(' ');
    return names.map(n => n.charAt(0).toUpperCase()).join('').substring(0, 2);
  }

  /**
   * Navigate to home page
   */
  navigateToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }

  /**
   * Navigate to user profile
   */
  navigateToProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  /**
   * Navigate to settings
   */
  navigateToSettings(): void {
    this.router.navigateByUrl('/settings');
  }

  /**
   * Logout user
   */
  logout(): void {
    if (this.isLoggingOut) return;

    this.isLoggingOut = true;
    this.authService.logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: error => {
          this.errorHandlerService.handleError(error, 'Logout failed');
          this.isLoggingOut = false;
        }
      });
  }
}
