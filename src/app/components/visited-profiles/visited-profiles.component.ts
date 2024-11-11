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
  profiles: any[] = [];

  private _discoverService = inject(DiscoverService);
  userProfiles: any[] = [];

  ngOnInit(): void {
    this.getProfiles()
    this.getVisitedProfiles()
  }

  getProfiles() {
    this.profiles = this.dataService.getProfiles()
  }

  getVisitedProfiles() {
    this._discoverService.getVisitedProfiles().subscribe((response: any) => {
      console.log(response, '<==== response getVisitedProfiles')
      if (response.success) {
        this.userProfiles = response.data;
      }
    },
      (error) => {
        console.error('Error fetching users:', error);
      })
  }

}
