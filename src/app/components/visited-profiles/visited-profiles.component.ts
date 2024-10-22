import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-visited-profiles',
  templateUrl: './visited-profiles.component.html',
  styleUrl: './visited-profiles.component.scss'
})
export class VisitedProfilesComponent implements OnInit {
  private dataService = inject(DataService);
  profiles: any[] = [];

  ngOnInit(): void {
    this.getProfiles()
  }

  getProfiles() {
    this.profiles = this.dataService.getProfiles()
  }
}
