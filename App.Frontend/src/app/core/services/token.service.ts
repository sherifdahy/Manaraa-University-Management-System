import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { STORAGE_KEY_CONSTS } from '../constants/storage-key-consts';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setCredentials(token : string): void {
    localStorage.setItem(STORAGE_KEY_CONSTS.AUTH_TOKEN, token);
  }

  clearCredentials(): void {
    localStorage.removeItem(STORAGE_KEY_CONSTS.AUTH_TOKEN);
  }

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEY_CONSTS.AUTH_TOKEN);
  }


}
