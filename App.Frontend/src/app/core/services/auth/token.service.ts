import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../../models/auth/responses/auth-response';
import { STORAGE_KEY_CONSTS } from '../../constants/storage-key-consts';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenSubject: BehaviorSubject<AuthResponse | null>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<AuthResponse | null>(null);
    this.checkOnInit();
  }

  checkOnInit(){
    const authResponse = localStorage.getItem(STORAGE_KEY_CONSTS.AUTH.TOKEN_OBJ);
    if(authResponse)
    {
      this.tokenSubject.next(JSON.parse(authResponse) as AuthResponse);
    }
  }

  setToken(authResponse: AuthResponse) {
    localStorage.setItem(STORAGE_KEY_CONSTS.AUTH.TOKEN_OBJ,JSON.stringify(authResponse));
    this.tokenSubject.next(authResponse);
  }

  removeToken() {
    localStorage.removeItem(STORAGE_KEY_CONSTS.AUTH.TOKEN_OBJ);
    this.tokenSubject.next(null);
  }

  get token$(){
    return this.tokenSubject.asObservable();
  }

  get token(){
    return this.tokenSubject.value;
  }

}
