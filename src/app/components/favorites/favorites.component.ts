import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DiscoverService } from '../../services/discover.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  private dataService = inject(DataService);
  profiles: any[] = [];

  private _discoverService = inject(DiscoverService);
  public userProfiles: any[] = []

  ngOnInit(): void {
    this.getProfiles()
  }

  getProfiles() {
    this._discoverService.getUsers().subscribe((response: any) => {
      console.log(response, '<==== response')
      if (response.success) {
        this.userProfiles = response.data;
      }
    })
  }

}
