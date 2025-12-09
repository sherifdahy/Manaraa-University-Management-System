import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Permission } from '../enums/permission.enum';

export const hasPermissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const data = route.data['required-permission'] as Permission;

  if (authService.currentUser?.permissions.includes(data))
    return true;

  router.navigate(['access-denied'], { queryParams: { returnUrl: route.url } });
  return false;
};
