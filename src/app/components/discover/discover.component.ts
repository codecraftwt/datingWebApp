import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { DiscoverService } from '../../services/discover.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent implements OnInit, AfterViewInit {

  private _discoverService = inject(DiscoverService);
  private _route = inject(ActivatedRoute);
  private _cdr = inject(ChangeDetectorRef);
  public userProfiles: any[] = [];
  public userProfileswithProfileMatching: any[] = [];
  public userProfilesBySearchingFor: any[] = [];
  public page = 1;
  public totalItems = 0;
  public itemsPerPage = 10;
  collection: any[] = [];
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

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.getUserwithProfileMatch();
  }

  ngAfterViewInit(): void {
    this._route.queryParams.subscribe(params => {
      const tabIndex = +params['tab'];
      if (!isNaN(tabIndex)) {
        this.tabGroup.selectedIndex = tabIndex;
      }
    });
  }

  onChangeItems() {
    this.itemsPerPage;
    this.getUserwithProfileMatch();
  }

  onPageChange(page: number) {
    this.page = page;
    this.getUserwithProfileMatch();
  }

  get pagedItems(): any[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.collection.slice(startIndex, endIndex);
  }

  getUserwithProfileMatch() {
    try {
      this._discoverService.getAllUsersWithProfileMatching(this.page, this.itemsPerPage).subscribe((response: any) => {
        if (response.success) {
          this.userProfileswithProfileMatching = response?.data;
          this.totalItems = response?.pagination?.count;
          this._cdr.detectChanges();
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

}
