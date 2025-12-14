import { Injectable } from '@angular/core';
import { ApiClientService } from '../api/api-client.service';
import { Observable } from 'rxjs';
import { RoleResponse } from '../../models/roles/responses/role-response';
import { API_ENDPOINTS_CONSTS } from '../../constants/end-point-consts';
import { RoleDetailResponse } from '../../models/roles/responses/role-detail-response';
import { RoleRequest } from '../../models/roles/requests/role-request';

@Injectable({
  providedIn: 'root'
})
export class RolesService{

  constructor(
    private apiCall : ApiClientService
  ) { }

  getAll(includeDisabled : boolean) : Observable<RoleResponse[]>
  {
    return this.apiCall.get<RoleResponse[]>(`${API_ENDPOINTS_CONSTS.ROLES.GET_ALL}?includeDisabled=${includeDisabled}`);
  }

  get(id:number) : Observable<RoleDetailResponse>{
    return this.apiCall.get<RoleDetailResponse>(`${API_ENDPOINTS_CONSTS.ROLES.GET}/${id}`);
  }

  getById(id: string): Observable<RoleDetailResponse> {
    return this.apiCall.get<RoleDetailResponse>(`${API_ENDPOINTS_CONSTS.ROLES.GET}/${id}`);
  }

  create(request : RoleRequest) : Observable<RoleResponse>
  {
    return this.apiCall.post<RoleResponse>(`${API_ENDPOINTS_CONSTS.ROLES.CREATE}`,request);
  }

  update(request: RoleRequest): Observable<any> {
    return this.apiCall.put(`${API_ENDPOINTS_CONSTS.ROLES.UPDATE}`, request);
  }

  toggleStatus(id : number)
  {
    return this.apiCall.delete(`${API_ENDPOINTS_CONSTS.ROLES.TOGGLE_STATUS}/${id}`);
  }

}
