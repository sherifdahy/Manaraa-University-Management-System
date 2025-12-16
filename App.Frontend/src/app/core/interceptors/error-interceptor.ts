import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, switchScan, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { AuthResponse } from '../models/auth/responses/auth-response';
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
      catchError((response: HttpErrorResponse) => {

        switch (response.status) {
          case 401:
            if (this.authService.isLoggedIn) {
              return this.authService.refreshToken().pipe(
                switchMap((authResponse: AuthResponse) => {
                  const newReq = req.clone({ setHeaders: { Authorization: `Bearer ${authResponse.token}` } });
                  return next.handle(newReq);
                }),
                catchError(err => {
                  return throwError(err.error.errors);
                })
              );
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
            console.error('Unexpected error:', response);
        }

        return throwError(response.error.errors);
      })
    )

  }
};
