import { Component } from '@angular/core';
import { AuthService } from '../../../../../../core/services/auth/auth.service';
import { AuthenticatedUserResponse } from '../../../../../../core/models/auth/responses/authenticated-user-response';
import { Permissions } from '../../../../../../core/constants/permission-consts';

@Component({
  selector: 'app-universities-page',
  standalone: false,
  templateUrl: './universities-page.component.html',
  styleUrl: './universities-page.component.css',
})
export class UniversitiesPageComponent {
  currentUser: AuthenticatedUserResponse | null = null;
  permissions: any;
  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
    this.permissions = Permissions;
  }
}
