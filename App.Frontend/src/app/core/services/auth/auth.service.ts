import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { TokenService } from './token.service';
import { LoginRequest } from '../../models/auth/requests/login-request';
import { AuthResponse } from '../../models/auth/responses/auth-response';
import { API_ENDPOINTS_CONSTS } from '../../constants/end-point-consts';
import { ApiClientService } from '../api/api-client.service';
import { AuthenticatedUserResponse } from '../../models/auth/responses/authenticated-user-response';
import { ForgetPasswordRequest } from '../../models/auth/requests/forget-password-request';
import { NewPasswordRequest } from '../../models/auth/requests/new-password-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthenticatedUserResponse | null>;
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(
    private apiCall: ApiClientService,
    private tokenService: TokenService,
    private jwtService: JwtService
  ) {
    this.currentUserSubject = new BehaviorSubject<AuthenticatedUserResponse | null>(null);
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.checkOnInit();
  }

  checkOnInit() {
    this.tokenService.token$.subscribe((response) => {
      if (response) {
        this.currentUserSubject.next(this.jwtService.decodeToken(response?.token));
        this.isLoggedInSubject.next(true);
      } else {
        this.isLoggedInSubject.next(false);
      }
    });
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.apiCall.post<AuthResponse>(API_ENDPOINTS_CONSTS.AUTH.LOGIN, request).pipe(
      tap((response) => {
        this.tokenService.setToken(response);
      })
    );
  }

  logout(): Observable<any> {
    return this.apiCall
      .post(API_ENDPOINTS_CONSTS.AUTH.REVOKE, {
        token: this.tokenService.token?.token,
        refreshToken: this.tokenService.token?.refreshToken,
      })
      .pipe((response) => {
        this.tokenService.removeToken();
        return response;
      });
  }

  refreshToken(): Observable<AuthResponse> {
    return this.apiCall
      .post<AuthResponse>(API_ENDPOINTS_CONSTS.AUTH.REFRESH_TOKEN, {
        token: this.tokenService.token?.token,
        refreshToken: this.tokenService.token?.refreshToken,
      })
      .pipe(
        tap((response) => {
          this.tokenService.setToken(response);
        })
      );
  }

  forgetPassword(request: ForgetPasswordRequest): Observable<void> {
    return this.apiCall.post<void>(API_ENDPOINTS_CONSTS.AUTH.FORGET_PASSWORD, request);
  }

  resetPassword(request: NewPasswordRequest): Observable<void> {
    return this.apiCall.post<void>(API_ENDPOINTS_CONSTS.AUTH.RESET_PASSWORD, request);
  }

  get currentUser(): AuthenticatedUserResponse | null {
    return this.currentUserSubject.value;
  }

  get currentUser$(): Observable<AuthenticatedUserResponse | null> {
    return this.currentUserSubject.asObservable();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
