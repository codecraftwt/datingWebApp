import { Component } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent {

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

}
