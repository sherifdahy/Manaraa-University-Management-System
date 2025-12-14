import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoleResponse } from '../../../../../core/models/roles/responses/role-response';
import { RolesService } from '../../../../../core/services/role/roles.service';
import { Route, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../../core/services/configuration/error-handler.service';

@Component({
  selector: 'app-role-card',
  standalone: false,
  templateUrl: './role-card.component.html',
  styleUrls: ['./role-card.component.css']
})
export class RoleCardComponent {
  @Input() role!: RoleResponse;
  @Output() reloadGridListner = new EventEmitter();

  constructor(private router : Router,private errorHandlerService : ErrorHandlerService,private roleService: RolesService) { }

  editRole(): void {
    this.router.navigate(['/system-admin/roles/edit', this.role.id]);
  }

  deleteRole(): void {
    this.roleService.toggleStatus(this.role.id).subscribe({
      next: () => {
        this.reloadGridListner.emit();
      },
      error: (errors) => {
        this.errorHandlerService.handleError(errors,'');
      }
    })
  }
}
