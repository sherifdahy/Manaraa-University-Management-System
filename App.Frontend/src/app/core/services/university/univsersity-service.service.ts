import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { Observable } from 'rxjs';
import { UniversityResponse } from '../../models/university/responses/university-response';
import { API_ENDPOINTS_CONSTS } from '../../constants/end-point-consts';
import { UniversityRequest } from '../../models/university/requests/university-request';

@Injectable({
  providedIn: 'root',
})
export class UnivsersityService {
  constructor(private apiService: ApiClientService) {}

  getAll(): Observable<UniversityResponse[]> {
    return this.apiService.get<UniversityResponse[]>(
      API_ENDPOINTS_CONSTS.UNIVERSITYS.GET_ALL
    );
  }

  create(request: UniversityRequest): Observable<UniversityResponse> {
    return this.apiService.post<UniversityResponse>(
      API_ENDPOINTS_CONSTS.UNIVERSITYS.CREATE,
      request
    );
  }

  toggleStatus(id: number): Observable<void> {
    return this.apiService.delete<void>(`
      ${API_ENDPOINTS_CONSTS.UNIVERSITYS.TOGGLE_STATUS}/${id}/toggle-status`);
  }
}
