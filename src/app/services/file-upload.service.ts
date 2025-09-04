import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private _http = inject(HttpService);

  constructor() { }

  public fileUpload(data: any) {
    return this._http.post<any>(`api/uploads/image`, data);
  }

}
