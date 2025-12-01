import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/auth/requests/login-request';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth/responses/auth-response';
import { ApiClientService } from './api-client.service';
import { API_ENDPOINTS_CONSTS } from '../constants/end-point-consts';
import { User } from '../models/User/responses/user';
import { TokenService } from './token.service';
import { ForgetPasswordRequest } from '../models/auth/requests/forget-password-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private apiClient: ApiClientService, private tokenService: TokenService) {
    this.checkOnInit();
  }

  checkOnInit() {
    const token = this.tokenService.accessToken;
    const refreshToken = this.tokenService.refreshToken;
    if (token && refreshToken) {
      const decoded = this.decode(token);
      this.currentUserSubject.next(decoded as User);
      this.isLoggedInSubject.next(true);
    }
  }

  isLoggedIn(): boolean {
    return this.tokenService.accessToken && this.tokenService.refreshToken ? true : false;
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.apiClient.post<AuthResponse>(API_ENDPOINTS_CONSTS.AUTH.LOGIN, request).pipe(
      tap((response) => {
        this.tokenService.setCredentials(response.token, response.refreshToken);
        const decoded = this.decode(response.token);
        this.currentUserSubject.next(decoded as User);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout() {
    this.tokenService.clearCredentials();
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.apiClient
      .post<AuthResponse>(API_ENDPOINTS_CONSTS.AUTH.REFRESH_TOKEN, {
        token: this.tokenService.accessToken,
        refreshToken: this.tokenService.refreshToken,
      })
      .pipe(
        tap((response) => {
          this.tokenService.setCredentials(response.token, response.refreshToken);
        })
      );
  }

  forgetPassword(request: ForgetPasswordRequest): Observable<void> {
    console.log(request);
    alert(API_ENDPOINTS_CONSTS.AUTH.FORGET_PASSWORD);
    return this.apiClient.post<void>(API_ENDPOINTS_CONSTS.AUTH.FORGET_PASSWORD, request);
  }

  private decode(token: string) {
    if (!token) {
      return null;
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
}
