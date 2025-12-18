import { Injectable } from '@angular/core';
import { FacultyRequest } from '../../models/faculty/requests/faculty-request';
import { ApiClientService } from '../api/api-client.service';
import { API_ENDPOINTS_CONSTS } from '../../constants/end-point-consts';
import { FacultyResponse } from '../../models/faculty/responses/faculty-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  constructor(private apiCall: ApiClientService) {}

  getAll(
    universityId: number,
    includeDisabled: boolean
  ): Observable<FacultyResponse[]> {
    return this.apiCall.get<FacultyResponse[]>(
      `${API_ENDPOINTS_CONSTS.UNIVERSITYS.GET_ALL}/${universityId}/faculities?includeDisabled=${includeDisabled}`
    );
  }

  get(id: number): Observable<FacultyResponse> {
    return this.apiCall.get<FacultyResponse>(
      `${API_ENDPOINTS_CONSTS.FACULITIES.GET}/${id}`
    );
  }

  create(request: FacultyRequest): Observable<FacultyResponse> {
    return this.apiCall.post<FacultyResponse>(
      API_ENDPOINTS_CONSTS.FACULITIES.CREATE,
      request
    );
  }

  update(request: FacultyRequest) {
    return this.apiCall.put(API_ENDPOINTS_CONSTS.FACULITIES.UPDATE, request);
  }

  toggleStatus(id: number): Observable<void> {
    return this.apiCall.delete<void>(`
      ${API_ENDPOINTS_CONSTS.FACULITIES.TOGGLE_STATUS}/${id}/toggle-status`);
  }
}
