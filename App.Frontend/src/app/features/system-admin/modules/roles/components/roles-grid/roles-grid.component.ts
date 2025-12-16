import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesService } from '../../../../../../core/services/role/roles.service';
import { RoleResponse } from '../../../../../../core/models/roles/responses/role-response';

@Component({
  selector: 'app-roles-grid',
  standalone: false,
  templateUrl: './roles-grid.component.html',
  styleUrls: ['./roles-grid.component.css']
})
export class RolesGridComponent implements OnInit {

  roles$!: Observable<RoleResponse[]>;
  includeDisabled: boolean = false;
  sortBy: string = 'name';


  constructor(private roleService: RolesService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roles$ = this.roleService.getAll(this.includeDisabled);
  }

  handleChangeIncludeDisabled() {
    this.loadRoles();
  }
}
