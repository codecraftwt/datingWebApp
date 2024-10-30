import { Component } from '@angular/core';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss'
})
export class SubscriptionsComponent {
  planBenifits = [
    "View unlimited photos",
    "Unlimited messaging",
    "See who's viewed you",
    "Distance search",
    "Detailed personality profile",
  ]
}
