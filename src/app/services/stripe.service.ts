import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private _httpService = inject(HttpService);
  constructor() {}

  // Create a Checkout Session
  public createCheckoutSession(data: { amount: number; currency: string; userId: string; planId: string }): Observable<any> {
    return this._httpService.post<any>('api/payments/create-checkout-session', data);
  }

  // Confirm Payment and Update Subscription
  public confirmPayment(data: { sessionId: string }): Observable<any> {
    return this._httpService.post<any>('api/payments/confirm-payment', data);
  }
}