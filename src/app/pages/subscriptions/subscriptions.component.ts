import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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

  authService = inject(AuthService)

  handleLogin() {
    this.authService.logout();
  }
}
