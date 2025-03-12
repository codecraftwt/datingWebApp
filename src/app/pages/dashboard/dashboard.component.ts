import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DiscoverService } from '../../services/discover.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private dataService = inject(DataService);
  profiles: any[] = [];
  currentUser: any = localStorage.getItem('user')
  user = JSON.parse(this.currentUser).user
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

  responsiveOptions: any[] | undefined;

  private _discoverService = inject(DiscoverService);
  private _router = inject(Router);
  public newUserProfiles: any[] = [];
  public likeUserProfiles: any[] = [];
  public recentVistorUserProfiles: any[] = [];

  constructor() { }

  ngOnInit() {
    // this.getProfiles()
    this.getUsers()
    this.getRecentVisitors()
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

  // getProfiles() {
  //   this.profiles = this.dataService.getProfiles()
  // }

  getRecentVisitors() {
    this._discoverService.getRecentVisitors().subscribe((response: any) => {
      if (response.success) {
        this.recentVistorUserProfiles = response.data;
      }
    },
      (error) => {
        console.error('Error fetching users:', error);
      })
  }

  getUsers() {
    this._discoverService.getUsers().subscribe((response: any) => {
      if (response.success) {
        this.newUserProfiles = response.data;
      }
    },
      (error) => {
        console.error('Error fetching users:', error);
      })
  }

  openVisitors(): void {
    this._router.navigate(['/discover'], { queryParams: { tab: 2 } });
  }

}
