import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject!: BehaviorSubject<any | null>;
  public user!: Observable<any | null>;
  private http = inject(HttpService);

  constructor(
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(data: any) {
    return this.http.post<any>(`api/auth/login`, data)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user.data));
        this.userSubject.next(user.data);
        return user;
      }));
  }

  register(data: any) {
    return this.http.post<any>(`api/auth/signin`, data)
  }

  checkIsEmail(email: any) {
    return this.http.post<any>(`api/auth/check-email`, email)
  }

  resetPassword(data: any) {
    return this.http.post<any>(`api/auth/reset-password`, data)
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }


}
