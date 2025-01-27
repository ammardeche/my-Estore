import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = auth.getValue(); // the default value is false

  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
