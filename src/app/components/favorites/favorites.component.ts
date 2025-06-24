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
  public filterParams = {
    minAge: 0,
    maxAge: 0,
    minHeight: 0,
    maxHeight: 0,
    childrens: '',
    wishForChildren: '',
    smoking: '',
    religion: '',
    education: ''
  };

  constructor() {
  }

  ngOnInit(): void {
    // this.getFavouritesByUser();
    this.getProfilesByLikes();
  }

  getFavouritesByUser() {
    this._discoverService.getFavouritesByUser().subscribe((response: any) => {
      if (response) {
        this.userProfiles = response.favorites;
      }
    })
  }

  getProfilesByLikes() {
    this._discoverService.getAllUsersWithProfileMatching(1, 100, this.filterParams.minAge, this.filterParams.maxAge, this.filterParams.minHeight, this.filterParams.maxHeight, this.filterParams.childrens, this.filterParams.wishForChildren, this.filterParams.smoking, this.filterParams.religion, this.filterParams.education).subscribe((res: any) => {
      if (res && res.success === true) {
        this.userProfiles = res.data.filter((user: any) => user.isLiked === true);
      }
    })

  }

}
