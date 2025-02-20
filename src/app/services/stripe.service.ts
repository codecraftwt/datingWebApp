import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
private _httpService = inject(HttpService);
  constructor() { }

  public createPaymentIntent(amount : any) {
    return this._httpService.post<any>(`api/payments/create-payment-intent`, {amount })
  }
}
