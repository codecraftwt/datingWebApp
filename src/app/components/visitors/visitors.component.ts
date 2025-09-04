import { Component, inject, OnInit } from '@angular/core';
import { DiscoverService } from '../../services/discover.service';
import { ProfileService } from '../../services/profile.service';
import { forkJoin } from 'rxjs';
import { subscriptionEnum } from '../../enums/subscription.enum';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrl: './visitors.component.scss'
})
export class VisitorsComponent implements OnInit {
  private _discoverService = inject(DiscoverService);
  private _profileService = inject(ProfileService);

  public userProfiles: any[] = [];
  public page = 1;
  public itemsPerPage = 10;
  public totalItems = 0;
  public totalPages = 0;
  public isSubscriptionError: boolean = false;
  public subEnums = subscriptionEnum;

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles() {
    this._discoverService.getRecentVisitors(this.page, this.itemsPerPage).subscribe({
      next: (response: any) => {
        if (response.success) {
          const visitorIds = response?.data?.map((visit: any) => visit.visitorId);

          // Create an array of observables
          const profileRequests = visitorIds.map((id: any) =>
            this._profileService.getProfileById(id)
          );

          // Use forkJoin with proper typing
          forkJoin(profileRequests).subscribe(
            (responses) => {
              const responsesArray = responses as any[];
              this.userProfiles = responsesArray
                .filter(res => res && res.success)
                .map(res => res.user);

              // Update pagination data
              this.totalItems = response?.pagination?.count || 0;
              this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
            },
            (err: any) => {
              console.error('Error fetching user profiles:', err);
            }
          );
        }
      },
      error: (err) => {
        this.isSubscriptionError = true;
        console.error('Error fetching visitors:', err);
      }
    });
  }

  onChangeItems() {
    this.page = 1;
    this.getProfiles();
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.getProfiles();
  }
}