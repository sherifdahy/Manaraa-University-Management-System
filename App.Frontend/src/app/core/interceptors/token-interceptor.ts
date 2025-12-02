import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/auth/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService:TokenService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.token?.token;

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq);
  }
}
