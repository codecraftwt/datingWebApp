import { Component, inject, Input, OnInit } from '@angular/core';
import { DiscoverService } from '../../../services/discover.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnInit {
  @Input({ required: true }) profile: any;
  isBookmarked: boolean = false;
  isPremium: boolean = true;

  private readonly _snackbar = inject(SnackbarService);

  constructor(
    private readonly _discoverService: DiscoverService
  ) { }

  ngOnInit(): void {
    let userData: any = localStorage.getItem('user')
    const user = JSON.parse(userData)
    if (user.user.subscriptionPlan === "free" || user.user.subscription.status === "inactive") {
      this.isPremium = false
    }
    this.isBookmarked = this.profile.isFavorited;
  }

  handleBookmark() {
    try {
      if (this.isBookmarked) {
        this._discoverService.removeFavourite(this.profile._id).subscribe((response: any) => {
          if (response.success) {
            this.isBookmarked = false;
            this._snackbar.open(response.message, 'success')
          }
        })
      } else {
        this._discoverService.AddToFavourite(this.profile._id).subscribe((response: any) => {
          if (response.success) {
            this.isBookmarked = true;
            this._snackbar.open(response.message, 'success')
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
}
