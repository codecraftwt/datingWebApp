import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getProfiles() {
    return [
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
  }

  getMusic() {
    return [
      "Alternative", "Blues", "Chember music", "Chillout", "Classical music", "Country", "Dance", "Easy listening", "Electro", "Folk music"
    ]
  }

  getSports() {
    return ["American Football", "Athletics", "Badminton", "Baseball", "Basketball", "Bouldering", "Bowling", "Canoe", "Climing"]
  }

  getTript() {
    return ["Active Trips", "Adventure Trips", "All-Inclusive Trips", "Art & Culture Holidays", "Backpacking", "Beach Trips"]
  }
}
