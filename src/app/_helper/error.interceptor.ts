import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthService);

  return next(req).pipe(
    catchError(err => {
      console.log(err, '<==== err')
      if ([401, 403].includes(err.status)) {
        authenticationService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(() => new Error(error));
    })
  );
};
