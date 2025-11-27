import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/auth/requests/login-request';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../models/auth/responses/login-response';
import { ApiClientService } from './api-client.service';
import { API_ENDPOINTS_CONSTS } from '../constants/end-point-consts';
import { User } from '../models/User/responses/user';
import { TokenService } from './token.service';
import { JwtService } from './jwt.service';

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
    private tokenService: TokenService,
    private jwtService: JwtService
  ) {
    this.checkOnInit();
  }

  checkOnInit() {
    const token = this.tokenService.getToken();
    if (token && this.jwtService.validateToken(token)) {
      const decoded = this.jwtService.decode(token);
      this.currentUserSubject.next(decoded as User);
      this.isAuthenticatedSubject.next(true);
    } else {
      this.tokenService.clearCredentials();
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
    }
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.apiClient.post<LoginResponse>(API_ENDPOINTS_CONSTS.AUTH.LOGIN, request).pipe(
      tap(response => {
        this.tokenService.setCredentials(response.token);
        const decoded = this.jwtService.decode(response.token);
        this.currentUserSubject.next(decoded as User);
        this.isAuthenticatedSubject.next(true);
      },
      )
    );
  }
}
