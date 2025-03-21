import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { DiscoverService } from '../../services/discover.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent implements OnInit ,AfterViewInit {

  private _discoverService = inject(DiscoverService);
  private _route = inject(ActivatedRoute);
  public userProfiles: any[] = [];
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  
  newForYou = [
    {
      id: "new1",
      image: "about-us.jpg",
      name: "Moona",
      designation: "Makeup Artist",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new2",
      image: "about-us.jpg",
      name: "Moona",
      designation: "Makeup Artist",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new3",
      image: "about-us.jpg",
      name: "Moona",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new4",
      image: "about-us.jpg",
      name: "Moona",
      designation: "Makeup Artist",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new5",
      image: "about-us.jpg",
      name: "Moona",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new5",
      image: "about-us.jpg",
      name: "Moona",
      designation: "Makeup Artist",
      location: "Mumbai",
      age: 30
    },
  ]

  music = [
    "Alternative", "Blues", "Chember music", "Chillout", "Classical music", "Country", "Dance", "Easy listening", "Electro", "Folk music"
  ]

  sports = ["American Football", "Athletics", "Badminton", "Baseball", "Basketball", "Bouldering", "Bowling", "Canoe", "Climing"]

  trips = ["Active Trips", "Adventure Trips", "All-Inclusive Trips", "Art & Culture Holidays", "Backpacking", "Beach Trips"]

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this._route.queryParams.subscribe(params => {
      const tabIndex = +params['tab'];
      if (!isNaN(tabIndex)) {
        this.tabGroup.selectedIndex = tabIndex;
      }
    });
  }

  getUsers() {
    this._discoverService.getUsers().subscribe((response: any) => {
      if (response.success) {
        this.userProfiles = response.data;
      }
    })
  }


}
