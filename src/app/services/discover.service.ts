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

  getAllUsersWithProfileMatching<T>(page: number, limit: number, minAge?: number, maxAge?: number, minHeight?: number, maxHeight?: number, childrens?: string, wishForChildren?: string, smoking?: string, religion?: string, education?: string): Observable<T> {
    return this.httpService.get<any>(`api/user/all-with-profile-matching?page=${page}&limit=${limit}&minAge=${minAge}&maxAge=${maxAge}&minHeight=${minHeight}&maxHeight=${maxHeight}&childrens=${childrens}&wishForChildren=${wishForChildren}&smoking=${smoking}&religion=${religion}&education=${education}`);
  }

  getAllUsersBySearchingFor<T>(): Observable<T> {
    return this.httpService.get<any>('api/user/all-by-searchingfor');
  }

  //API to post visit
  postVisit<T>(visitorId: string, visitedId: string): Observable<T> {
    return this.httpService.post<any>('api/visits/post-visit', { visitorId, visitedId });
  }

  getRecentVisitors<T>(page: number, limit: number): Observable<T> {
    return this.httpService.get<any>(`api/visits/visitors/${this.currentUser._id}?page=${page}&limit=${limit}`);
  }

  getVisitedProfiles<T>(page: number, limit: number): Observable<T> {
    return this.httpService.get<any>(`api/visits/visited/${this.currentUser._id}?page=${page}&limit=${limit}`);
  }

  getFavouritesByUser<T>(): Observable<T> {
    return this.httpService.get<any>(`api/favorite/${this.currentUser._id}`)
  }

  AddToFavourite<T>(favoriteUserId: string): Observable<T> {
    return this.httpService.post<any>(`api/favorite/add`, { favoriteUserId });
  }

  removeFavourite<T>(favoriteUserId: string): Observable<T> {
    return this.httpService.post<any>(`api/favorite/remove`, { favoriteUserId });
  }
}
