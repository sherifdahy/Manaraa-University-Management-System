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

  create(request: FacultyRequest): Observable<FacultyResponse> {
    return this.apiCall.post<FacultyResponse>(
      API_ENDPOINTS_CONSTS.FACULITIES.CREATE,
      request
    );
  }
}
