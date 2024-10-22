import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrl: './visitors.component.scss'
})
export class VisitorsComponent implements OnInit {
  private dataService = inject(DataService);
  profiles: any[] = [];

  ngOnInit(): void {
    this.getProfiles()
  }

  getProfiles() {
    // this.profiles = this.dataService.getProfiles()
  }
}
