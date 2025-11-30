import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { STORAGE_KEY_CONSTS } from '../constants/storage-key-consts';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setCredentials(token: string, refreshToken: string): void {
    localStorage.setItem(STORAGE_KEY_CONSTS.AUTH.ACCESS_TOKEN, token);
    localStorage.setItem(STORAGE_KEY_CONSTS.AUTH.REFRESH_TOKEN, refreshToken);
  }

  clearCredentials(): void {
    localStorage.removeItem(STORAGE_KEY_CONSTS.AUTH.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY_CONSTS.AUTH.REFRESH_TOKEN)
  }

  get accessToken(): string | null {
    return localStorage.getItem(STORAGE_KEY_CONSTS.AUTH.ACCESS_TOKEN);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEY_CONSTS.AUTH.REFRESH_TOKEN);
  }

}
