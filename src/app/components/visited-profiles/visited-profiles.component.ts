import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DiscoverService } from '../../services/discover.service';

@Component({
  selector: 'app-visited-profiles',
  templateUrl: './visited-profiles.component.html',
  styleUrl: './visited-profiles.component.scss'
})
export class VisitedProfilesComponent implements OnInit {
  private dataService = inject(DataService);
  public profiles: any[] = [];
  private _discoverService = inject(DiscoverService);
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
        const transformedData = response?.data?.map((visit: any) => visit.visited);
        this.userProfiles = transformedData;
        this.totalItems = response?.pagination?.count;
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
