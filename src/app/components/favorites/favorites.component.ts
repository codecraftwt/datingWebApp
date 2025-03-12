import { Component, inject, OnInit } from '@angular/core';
import { DiscoverService } from '../../services/discover.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  profiles: any[] = [];

  private _discoverService = inject(DiscoverService);
  public userProfiles: any[] = []

  ngOnInit(): void {
    this.getFavouritesByUser();
  }

  getFavouritesByUser() {
    this._discoverService.getFavouritesByUser().subscribe((response: any) => {
      if (response) {
        this.userProfiles = response.favorites;
      }
    })
  }

}
