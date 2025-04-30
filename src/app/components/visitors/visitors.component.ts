import { Component, inject, OnInit } from '@angular/core';
import { DiscoverService } from '../../services/discover.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrl: './visitors.component.scss'
})
export class VisitorsComponent implements OnInit {
  private _discoverService = inject(DiscoverService);
  public profiles: any[] = [];
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
    this._discoverService.getRecentVisitors(this.page, this.itemsPerPage).subscribe((response: any) => {
      if (response.success) {
        const transformedData = response?.data?.map((visit: any) => visit.visitor);
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
