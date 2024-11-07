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

  constructor() { }

  getUsers<T>(): Observable<T> {
    return this.httpService.get<any>('api/user/all');
  }
}
