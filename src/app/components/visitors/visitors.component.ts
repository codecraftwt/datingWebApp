import { Component, inject, OnInit } from '@angular/core';
import { DiscoverService } from '../../services/discover.service';
import { ProfileService } from '../../services/profile.service';
import { forkJoin } from 'rxjs';

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
  public totalItems = 0;
  public itemsPerPage = 10;
  collection: any[] = [];

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles() {
    this._discoverService.getRecentVisitors(this.page, this.itemsPerPage).subscribe({
      next: (response: any) => {
        if (response.success) {
          const visitorIds = response?.data?.map((visit: any) => visit.visitorId);
          const profileRequests = visitorIds.map((id: any) => this._profileService.getProfileById(id));

          forkJoin(profileRequests).subscribe({
            next: (profileResponses: any[]) => {
              this.userProfiles = profileResponses
                .filter(res => res.success)
                .map(res => res.user);

              this.totalItems = response?.pagination?.count;
            },
            error: (err:any) => {
              console.error('Error fetching user profiles:', err);
            }
          } as any);
        }
      },
      error: (err) => {
        console.error('Error fetching visitors:', err);
      }
    });
  }

  onChangeItems() {
    this.itemsPerPage;
    this.getProfiles();
  }

  onPageChange(page: number) {
    this.page = page;
    this.getProfiles();
  }

  get pagedItems(): any[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.collection.slice(startIndex, endIndex);
  }
}
