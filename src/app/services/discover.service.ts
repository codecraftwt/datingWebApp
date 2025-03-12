import { inject, Injectable } from '@angular/core';
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

  //API to post visit
  postVisit<T>(visitorId: string, visitedId: string): Observable<T> {
    return this.httpService.post<any>('api/visitors/visit', { visitorId, visitedId });
  }

  getRecentVisitors<T>(): Observable<T> {
    return this.httpService.get<any>(`api/visitors/${this.currentUser._id}`);
  }

  getVisitedProfiles<T>(): Observable<T> {
    return this.httpService.get<any>(`api/visitors/visited/${this.currentUser._id}`);
  }

  getFavouritesByUser<T>(): Observable<T> {
    return this.httpService.get<any>(`api/favorite/${this.currentUser._id}`)
  }

  AddToFavourite<T>(favoriteUserId: string): Observable<T> {
    return this.httpService.post<any>(`api/favorite/add`, {favoriteUserId});
  }

  removeFavourite<T>(favoriteUserId: string): Observable<T> {
    return this.httpService.post<any>(`api/favorite/remove`, {favoriteUserId});
  }
}
