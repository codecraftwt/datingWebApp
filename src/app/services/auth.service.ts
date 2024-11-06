import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject!: BehaviorSubject<any | null>;
  public user!: Observable<any | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(data: any) {
    return this.http.post<any>(`${environment.apiUrl}api/auth/login`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  register(data: any) {
    return this.http.post<any>(`${environment.apiUrl}api/auth/signin`, data, { headers: { 'Content-Type': 'application/json' } })
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('user');
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }


}
