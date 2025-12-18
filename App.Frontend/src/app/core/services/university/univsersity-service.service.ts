import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { Observable } from 'rxjs';
import { UniversityResponse } from '../../models/university/responses/university-response';
import { API_ENDPOINTS_CONSTS } from '../../constants/end-point-consts';
import { UniversityRequest } from '../../models/university/requests/university-request';
import { UniversityDetailResponse } from '../../models/university/responses/university-detail-response';

@Injectable({
  providedIn: 'root',
})
export class UnivsersityService {
  constructor(private apiCall: ApiClientService) {}

  getAll(includeDisabled: boolean): Observable<UniversityResponse[]> {
    return this.apiCall.get<UniversityResponse[]>(
      `${API_ENDPOINTS_CONSTS.UNIVERSITYS.GET_ALL}?includeDisabled=${includeDisabled}`
    );
  }

  get(id: number): Observable<UniversityDetailResponse> {
    return this.apiCall.get<UniversityDetailResponse>(
      `${API_ENDPOINTS_CONSTS.UNIVERSITYS.GET}/${id}`
    );
  }

  create(request: UniversityRequest): Observable<UniversityResponse> {
    return this.apiCall.post<UniversityResponse>(
      API_ENDPOINTS_CONSTS.UNIVERSITYS.CREATE,
      request
    );
  }

  update(request: UniversityRequest) {
    return this.apiCall.put(API_ENDPOINTS_CONSTS.UNIVERSITYS.UPDATE, request);
  }

  toggleStatus(id: number): Observable<void> {
    return this.apiCall.delete<void>(`
      ${API_ENDPOINTS_CONSTS.UNIVERSITYS.TOGGLE_STATUS}/${id}/toggle-status`);
  }
}
