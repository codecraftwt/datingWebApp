import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _http = inject(HttpClient);
  constructor() { }

  private getHeaders(): HttpHeaders {
    const user: any = localStorage.getItem('user');
    const token = JSON.parse(user).token;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }


  // GET request
  get<T>(url: string): Observable<T> {
    return this._http.get<T>(`${environment.apiUrl}${url}`, { headers: this.getHeaders() });
  }

  // POST request
  post<T>(url: string, body: any): Observable<T> {
    return this._http.post<T>(`${environment.apiUrl}${url}`, body, { headers: this.getHeaders() });
  }

  // PUT request
  put<T>(url: string, body: any): Observable<T> {
    return this._http.put<T>(`${environment.apiUrl}${url}`, body, { headers: this.getHeaders() });
  }

  // DELETE request
  delete<T>(url: string): Observable<T> {
    return this._http.delete<T>(`${environment.apiUrl}${url}`, { headers: this.getHeaders() });
  }

}
