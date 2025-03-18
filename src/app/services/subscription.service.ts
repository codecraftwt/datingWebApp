import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private _httpService = inject(HttpService);
    user: any = localStorage.getItem('user');
    currentUser = JSON.parse(this.user).user;
  
  constructor() { }

  // create a subscription
  public createSubscription(data: any){
    return this._httpService.post(`api/subscription/create-subscription`, data);
  }

  // to get all subscription plans
  public getAllSubscriptionPlans(){
    return this._httpService.get(`api/subscription/subscriptionPlans`);
  }

  // to create a subscription plan
  public postSubscription(data: any){
    return this._httpService.post(`api/subscription/create-subscriptionPlan`, data);
  }
}
