import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  private dataService = inject(DataService);
  profiles: any[] = [];

  ngOnInit(): void {
    this.getProfiles()
  }

  getProfiles() {
    // this.profiles = this.dataService.getProfiles()
  }

}
