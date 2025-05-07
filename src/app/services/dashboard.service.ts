import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private get currentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).user : null;
  }

  private httpService = inject(HttpService);

  getProfileCompletepercentage<T>(): Observable<T> {
    return this.httpService.get<any>(`api/profile/percentage/${this.currentUser._id}`);
  }
}
