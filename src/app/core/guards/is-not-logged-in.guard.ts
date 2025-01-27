import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isNotLoggedInGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = auth.getValue();
  console.log('value from isNotLoggedIn guard ', isLoggedIn);

  if (!isLoggedIn) {
    return true;
  } else {
    router.navigate(['/layout']);
    return false;
  }
};
