import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, switchScan, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../models/auth/responses/auth-response';
import { inject } from 'vitest';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        switch (error.status) {
          case 401:
            debugger;
            const ac = this.authService.getAccessToken;
            const rt = this.authService.getRefreshToken;
            if (ac && rt) {
              return this.authService.refreshToken().pipe(
                switchMap((authResponse: AuthResponse) => {
                  const newReq = req.clone({ setHeaders: { Authorization: `Bearer ${authResponse.token}` } });
                  return next.handle(newReq);
                }),
                catchError(err => {
                  this.authService.clearCredentials();
                  return throwError(() => err);
                })
              );
            }
            else{
              this.router.navigateByUrl('auth/login');
            }
            break;


          case 403:
            this.router.navigate(['/access-denied']);
            break;

          case 404:
            this.router.navigate(['/not-found']);
            break;

          case 400:
          case 422:
            // Let component handle validation errors
            break;

          case 500:
          case 502:
          case 503:
            this.router.navigate(['/server-error']);
            break;

          case 0:
            console.error('Network error - please check your connection');
            break;

          default:
            console.error('Unexpected error:', error);
        }

        return throwError(error);
      })
    )

  }
};
