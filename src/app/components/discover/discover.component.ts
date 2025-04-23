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
  public userProfileswithProfileMatching: any[] = [];
  public userProfilesBySearchingFor: any[] = [];
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
    this.getAllUsers();
    this.getUserwithProfileMatch();
    this.getUserBySearchingFor();
  }

  ngAfterViewInit(): void {
    this._route.queryParams.subscribe(params => {
      const tabIndex = +params['tab'];
      if (!isNaN(tabIndex)) {
        this.tabGroup.selectedIndex = tabIndex;
      }
    });
  }

  getAllUsers() {
    this._discoverService.getUsers().subscribe((response: any) => {
      if (response.success) {
        this.userProfiles = response.data;
      }
    })
  }

  getUserwithProfileMatch() {
    try{
      this._discoverService.getAllUsersWithProfileMatching().subscribe((response: any) => {
        if (response.success) {
          this.userProfileswithProfileMatching = response.data;
          console.log(this.userProfileswithProfileMatching,'userProfileswithProfileMatching');
          
        }
      })
    }catch (error){
      console.error(error)
    }
  }

  getUserBySearchingFor() {
    try{
      this._discoverService.getAllUsersBySearchingFor().subscribe((response: any) => {
        if (response.success) {
          this.userProfilesBySearchingFor = response.data;
          console.log(this.userProfilesBySearchingFor,'userProfilesBySearchingFor');
          
        }
      })
    }catch (error){
      console.error(error)
    }
  }
}
