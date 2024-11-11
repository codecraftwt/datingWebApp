import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  private httpService = inject(HttpService);
  user: any = localStorage.getItem('user');
  currentUser = JSON.parse(this.user).user;
  constructor() { }

  getUsers<T>(): Observable<T> {
    return this.httpService.get<any>('api/user/all');
  }

  getRecentVisitors<T>(): Observable<T> {
    return this.httpService.get<any>(`api/visitors/${this.currentUser._id}`);
  }

  getVisitedProfiles<T>(): Observable<T> {
    return this.httpService.get<any>(`api/visitors/visited/${this.currentUser._id}`);
  }
}
