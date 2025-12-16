import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RoleResponse } from '../../../../../../core/models/roles/responses/role-response';
import { ErrorHandlerService } from '../../../../../../core/services/configuration/error-handler.service';
import { RolesService } from '../../../../../../core/services/role/roles.service';

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
