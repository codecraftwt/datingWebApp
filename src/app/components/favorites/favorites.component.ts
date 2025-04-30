import { Component, inject, OnInit } from '@angular/core';
import { DiscoverService } from '../../services/discover.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  public profiles: any[] = [];
  private _discoverService = inject(DiscoverService);
  public userProfiles: any[] = []
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
    this.getFavouritesByUser();
  }

  getFavouritesByUser() {
    this._discoverService.getFavouritesByUser().subscribe((response: any) => {
      if (response) {
        this.userProfiles = response.favorites;
        this.totalItems = response.favorites.length;

      }
    })
  }

  onChangeItems() {
    this.itemsPerPage;
    this.getFavouritesByUser();
  }

  onPageChange(page: number) {
    this.page = page;
    this.getFavouritesByUser();
  }

  get pagedItems(): any[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.collection.slice(startIndex, endIndex);
  }

}
