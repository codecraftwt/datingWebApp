import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment.development';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthService);
  console.log(req, 'req')

  const user = authenticationService.userValue;
  const isLoggedIn = user?.token;
  const isApiUrl = req.url.startsWith(environment.apiUrl);
  console.log(isApiUrl, 'isAPIURL')
  console.log(isLoggedIn, 'isLoggedIn')

  if (isLoggedIn && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }

  return next(req);
};
