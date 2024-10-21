import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  steps = [
    {
      id: "step1",
      title: 'First Steps',
      image: 'step1.svg',
      description: 'Congratulations, the journey for your next relationship begins now. Scroll through our expert tips and dating advice to get started.'
    },
    {
      id: "step2",
      title: 'Complete Your Profile',
      image: 'step2.svg',
      description: "Upload pictures, fill out your profile information and answer About Me questions. Don't forget to always keep your profile up to date."
    },
    {
      id: "step3",
      title: 'Learn About Other Members',
      image: 'step3.svg',
      description: 'Adjust your preferences, browse through your discover list, check out interesting profiles and learn more about the persons behind them.'
    },
    {
      id: "step4",
      title: 'Start Communicating',
      image: 'step4.svg',
      description: 'Get in touch with your potential matches by sending a message, smile or an icebreaker. Our tip is to keep your messages short and sweet.'
    },
    {
      id: "step5",
      title: 'Find Your Person',
      image: 'step5.svg',
      description: 'Make sure to be yourself and have fun in your relationship search. Think of us as your invisible wingman. You got this.'
    },
  ]

  newForYou = [
    {
      id: "new1",
      image: "about-us.jpg",
      name: "Moona",
      designation:"Makeup Artist",
      location: "Mumbai",
      age: 30
    },
    {
      id: "new2",
      image: "about-us.jpg",
      name: "Moona",
      designation:"Makeup Artist",
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
      designation:"Makeup Artist",
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
      designation:"Makeup Artist",
      location: "Mumbai",
      age: 30
    },
  ]

  responsiveOptions: any[] | undefined;

  constructor() { }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '1439px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '1023px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
}
