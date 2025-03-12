import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _httpService = inject(HttpService);
  constructor() { }

  public getProfileById(id: string) {
    return this._httpService.get<any>(`api/user/${id}`);
  }

  public likeProfile(data: any) {
    return this._httpService.post(`api/likes/like-profile`, data);
  }

  public checkLike(currentUserId: string, profileId: string) {
    return this._httpService.get(`api/likes/${profileId}?loggedInUserId=${currentUserId}`);
  }

  public updateProfile(id: string, data: any) {
    return this._httpService.put(`api/user/${id}`, data)
  }
}
