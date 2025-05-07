import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private currentSubscription = new BehaviorSubject<any>(null);
  private _httpService = inject(HttpService);
    user: any = localStorage.getItem('user');
    currentUser = JSON.parse(this.user).user;
    
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

  // to get subscription status
  getSubscriptionStatus() {
    return this._httpService.get(`/api/subscription/check-subscription/${this.currentUser._id}`);
  }

  // to check if user has premium access
  hasPremiumAccess() {
    return this.currentSubscription.pipe(
      map(sub => sub?.plan === 'Premium PLUS' || sub?.plan === 'Premium ULTRA')
    );
  }
}
