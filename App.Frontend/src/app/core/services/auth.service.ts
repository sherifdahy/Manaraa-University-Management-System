import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/auth/requests/login-request';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth/responses/auth-response';
import { ApiClientService } from './api-client.service';
import { API_ENDPOINTS_CONSTS } from '../constants/end-point-consts';
import { User } from '../models/User/responses/user';
import { STORAGE_KEY_CONSTS } from '../constants/storage-key-consts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiClient: ApiClientService,
  ) {
    this.checkOnInit();
  }

  checkOnInit() {
    const token = this.getAccessToken;
    const refreshToken = this.getRefreshToken;
    if (token && refreshToken) {
      const decoded = this.decode(token);
      this.currentUserSubject.next(decoded as User);
      this.isAuthenticatedSubject.next(true);
    }
  }

  isLoggedIn(): boolean {
    let token = this.getAccessToken;

    if (token)
      return true;

    return false;
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.apiClient.post<AuthResponse>(API_ENDPOINTS_CONSTS.AUTH.LOGIN, request).pipe(
      tap(response => {
        debugger;
        this.setCredentials(response.token, response.refreshToken);
        const decoded = this.decode(response.token);
        this.currentUserSubject.next(decoded as User);
        this.isAuthenticatedSubject.next(true);
      },
      )
    );
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.apiClient.post<AuthResponse>(API_ENDPOINTS_CONSTS.AUTH.REFRESH_TOKEN, {
      token: this.getAccessToken,
      refreshToken: this.getRefreshToken
    }).pipe(
      tap((response)=>{
        this.setCredentials(response.token,response.refreshToken);
      })
    );
  }

  private decode(token : string)
  {
    if(!token){
      return null;
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }


  setCredentials(token: string, refreshToken: string): void {
    localStorage.setItem(STORAGE_KEY_CONSTS.AUTH.ACCESS_TOKEN, token);
    localStorage.setItem(STORAGE_KEY_CONSTS.AUTH.REFRESH_TOKEN, refreshToken);
  }

  clearCredentials(): void {
    localStorage.removeItem(STORAGE_KEY_CONSTS.AUTH.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY_CONSTS.AUTH.REFRESH_TOKEN)
  }

  get getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEY_CONSTS.AUTH.ACCESS_TOKEN);
  }

  get getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEY_CONSTS.AUTH.REFRESH_TOKEN);
  }
}
