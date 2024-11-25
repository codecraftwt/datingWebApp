import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _httpService = inject(HttpService);
  constructor() { }

  public getProfileById(id: string) {
    return this._httpService.get<any>(`api/user/${id}`)
  }
}
