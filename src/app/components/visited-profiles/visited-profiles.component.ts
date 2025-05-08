import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DiscoverService } from '../../services/discover.service';
import { forkJoin } from 'rxjs';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-visited-profiles',
  templateUrl: './visited-profiles.component.html',
  styleUrl: './visited-profiles.component.scss'
})
export class VisitedProfilesComponent implements OnInit {
  private dataService = inject(DataService);
  public profiles: any[] = [];
  private _discoverService = inject(DiscoverService);
  private _profileService = inject(ProfileService);
  public userProfiles: any[] = [];
  public page = 1;
  public totalItems = 0;
  public itemsPerPage = 10;
  public collection: any[] = [];

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.getProfiles()
    this.getVisitedProfiles()
  }

  getProfiles() {
    this.profiles = this.dataService.getProfiles()
  }

  getVisitedProfiles() {
    this._discoverService.getVisitedProfiles(this.page, this.itemsPerPage).subscribe((response: any) => {
      if (response.success) {
        const visitedIds = response?.data?.map((visit: any) => visit.visitedId);
        const profileRequests = visitedIds.map((id: any) => this._profileService.getProfileById(id));

        forkJoin(profileRequests).subscribe({
          next: (profileResponses: any[]) => {
            this.userProfiles = profileResponses
              .filter(res => res.success)
              .map(res => res.user);

            this.totalItems = response?.pagination?.count;
          },
          error: (err: any) => {
            console.error('Error fetching user profiles:', err);
          }
        } as any);
      }
    },
      (error) => {
        console.error('Error fetching users:', error);
      })
  }

  onChangeItems() {
    this.itemsPerPage;
    this.getVisitedProfiles();
  }

  onPageChange(page: number) {
    this.page = page;
    this.getVisitedProfiles();
  }

  get pagedItems(): any[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.collection.slice(startIndex, endIndex);
  }

}
