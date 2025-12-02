import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { LoginRequest } from '../../models/auth/requests/login-request';
import { AuthResponse } from '../../models/auth/responses/auth-response';
import { API_ENDPOINTS_CONSTS } from '../../constants/end-point-consts';
import { ApiClientService } from '../api/api-client.service';
import { AuthenticatedUserResponse } from '../../models/auth/responses/authenticated-user-response';
import { ForgetPasswordRequest } from '../../models/auth/requests/forget-password-request';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<AuthenticatedUserResponse | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private apiCall: ApiClientService, private authStorageService: AuthStorageService, private jwtService: JwtService) {
    this.checkOnInit();
  }

  checkOnInit() {
    this.authStorageService.getAuthData$().subscribe(response => {
      if (response) {
        this.currentUserSubject.next(this.jwtService.decodeToken(response?.token))
        this.isLoggedInSubject.next(true);
      }
      else {
        this.isLoggedInSubject.next(false);
      }
    })
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.apiCall.post<AuthResponse>(API_ENDPOINTS_CONSTS.AUTH.LOGIN, request).pipe(
      tap(response => {
        this.authStorageService.saveAuthData(response);
      }),
    );
  }

  logout(): Observable<any> {
    return this.apiCall.post(API_ENDPOINTS_CONSTS.AUTH.REVOKE, {
      token: this.authStorageService.getAuthData()?.token,
      refreshToken: this.authStorageService.getAuthData()?.refreshToken
    }).pipe((response) => {
      this.authStorageService.clearAuthData();
      return response;
    }
    )
  }

  forgetPassword(request: ForgetPasswordRequest): Observable<void> {
    console.log(request);
    alert(API_ENDPOINTS_CONSTS.AUTH.FORGET_PASSWORD);
    return this.apiCall.post<void>(API_ENDPOINTS_CONSTS.AUTH.FORGET_PASSWORD, request);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.apiCall.post<AuthResponse>(API_ENDPOINTS_CONSTS.AUTH.REFRESH_TOKEN, {
      token: this.authStorageService.getAuthData()?.token,
      refreshToken: this.authStorageService.getAuthData()?.refreshToken
    }).pipe(
      tap(response => {
        this.authStorageService.saveAuthData(response);
      })
    );
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
