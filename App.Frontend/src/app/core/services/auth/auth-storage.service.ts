import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../../models/auth/responses/auth-response';
import { STORAGE_KEY_CONSTS } from '../../constants/storage-key-consts';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  private authDataSubject: BehaviorSubject<AuthResponse | null>;

  constructor() {
    this.authDataSubject = new BehaviorSubject<AuthResponse | null>(null);
    this.loadAuthDataFromStorage();
  }

  private loadAuthDataFromStorage(): void {
    const storedAuthData = localStorage.getItem(STORAGE_KEY_CONSTS.AUTH.TOKEN_OBJ);
    if (storedAuthData) {
      try {
        const authData = JSON.parse(storedAuthData) as AuthResponse;
        this.authDataSubject.next(authData);
      } catch (error) {
        console.error('Failed to parse stored auth data:', error);
        this.clearAuthData();
      }
    }
  }

  saveAuthData(authResponse: AuthResponse): void {
    localStorage.setItem(
      STORAGE_KEY_CONSTS.AUTH.TOKEN_OBJ,
      JSON.stringify(authResponse)
    );
    this.authDataSubject.next(authResponse);
  }

  clearAuthData(): void {
    localStorage.removeItem(STORAGE_KEY_CONSTS.AUTH.TOKEN_OBJ);
    this.authDataSubject.next(null);
  }

  getAuthData$(): Observable<AuthResponse | null> {
    return this.authDataSubject.asObservable();
  }

  getAuthData(): AuthResponse | null {
    return this.authDataSubject.value;
  }

  isAuthenticated(): boolean {
    return this.authDataSubject.value !== null;
  }
}
