import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decode(token : string)
  {
    if(!token){
      return null;
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }

  validateToken(token: string): boolean {
    const decoded = this.decode(token);
    if (!decoded || !decoded.exp) {
      return false;
    }
    const expiryTime = decoded.exp * 1000;
    return Date.now() < expiryTime;
  }
}
