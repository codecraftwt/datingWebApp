import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  private httpService = inject(HttpService);
  constructor() { }

  private get currentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).user : null;
  }

  getUsers<T>(): Observable<T> {
    return this.httpService.get<any>('api/user/all');
  }

  getAllUsersWithProfileMatching<T>(): Observable<T> {
    return this.httpService.get<any>('api/user/all-with-profile-matching');
  }

  getAllUsersBySearchingFor<T>(): Observable<T> {
    return this.httpService.get<any>('api/user/all-by-searchingfor');
  }

  //API to post visit
  postVisit<T>(visitorId: string, visitedId: string): Observable<T> {
    return this.httpService.post<any>('api/visits/post-visit', { visitorId, visitedId });
  }

  getRecentVisitors<T>(): Observable<T> {
    return this.httpService.get<any>(`api/visits/visitors/${this.currentUser._id}`);
  }

  getVisitedProfiles<T>(): Observable<T> {
    return this.httpService.get<any>(`api/visits/visited/${this.currentUser._id}`);
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
