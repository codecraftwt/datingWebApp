import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private profileSubject = new BehaviorSubject<any>(null);
  public $profile = this.profileSubject.asObservable();

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
    return this._httpService.patch(`api/user/${id}`, data);
  }

  public getUserDetails(userId: string) {
    return this._httpService.get(`api/userDetails/${userId}`);
  }

  public postUserDetails(data: any) {
    return this._httpService.post(`api/userDetails/create`, data);
  }

  public updateUserDetails(userId: string, data: any) {
    return this._httpService.patch(`api/userDetails/${userId}`, data);
  }

  // Method to update the profile picture
  public updateProfilePicture(profileData: any): void {
    this.profileSubject.next(profileData);
  }

}
