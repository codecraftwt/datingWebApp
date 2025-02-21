import { Component, inject, OnInit } from '@angular/core';
import { DiscoverService } from '../../services/discover.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrl: './visitors.component.scss'
})
export class VisitorsComponent implements OnInit {
  private _discoverService = inject(DiscoverService);
  profiles: any[] = [];
  userProfiles: any[] = [];

  ngOnInit(): void {
    this.getProfiles()
  }

  getProfiles() {
    this._discoverService.getRecentVisitors().subscribe((response: any) => {
      console.log(response, '<==== response')
      if (response.success) {
        this.userProfiles = response.data;
      }
    },
      (error) => {
        console.error('Error fetching users:', error);
      })
  }
}
