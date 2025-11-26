import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          router.navigate(['/login'], {
            queryParams: { returnUrl: router.url }
          });
          break;

        case 403:
          router.navigate(['/access-denied']);
          break;

        case 404:
          router.navigate(['/not-found']);
          break;

        case 400:
        case 422:
          // Let component handle validation errors
          // Don't navigate, just pass the error
          break;

        case 500:
        case 502:
        case 503:
          router.navigate(['/server-error']);
          break;

        case 0:
          console.error('Network error - please check your connection');
          break;

        default:
          console.error('Unexpected error:', error);
      }
      return throwError(() => error);
    })
  );
};
