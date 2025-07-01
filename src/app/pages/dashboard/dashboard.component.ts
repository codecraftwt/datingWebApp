import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DiscoverService } from '../../services/discover.service';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { subscriptionEnum } from '../../enums/subscription.enum';
import { forkJoin } from 'rxjs';
import { ProfileService } from '../../services/profile.service';

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
  private _dashboardService = inject(DashboardService);
  private _profileService = inject(ProfileService);
  private _router = inject(Router);
  public newUserProfiles: any[] = [];
  public likeUserProfiles: any[] = [];
  public recentVistorUserProfiles: any[] = [];
  public recentUsers: any[] = [];
  public profilePercent: any;
  public isSubscriptionError: boolean = false;
  public subEnums = subscriptionEnum

  constructor() { }

  ngOnInit() {
    this.getUsers();
    this.getRecentVisitors();
    this.getProfilePercent();
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

  getRecentVisitors() {
    this._discoverService.getRecentVisitors(1, 10).subscribe({
      next: (response: any) => {
        if (response.success) {
          const visitorIds = response?.data?.map((visit: any) => visit.visitorId);
          const profileRequests = visitorIds.map((id: any) => this._profileService.getProfileById(id));

          forkJoin(profileRequests).subscribe({
            next: (profileResponses: any[]) => {
              let transformedData = profileResponses
                .filter(res => res.success)
                .map(res => res.user);
              this.recentVistorUserProfiles = transformedData;
            },
            error: (err: any) => {
              console.error('Error fetching user profiles:', err);
            }
          } as any);
        }
      },
      error: (err) => {
        this.isSubscriptionError = true;
        console.error('Error fetching visitors:', err);
      }
    });
  }

  getUsers() {
    try {
      this._discoverService.getAllUsersWithProfileMatching(1, 6, 0, 0, 0, 0, '', '', '', '', '').subscribe((response: any) => {
        if (response.success) {
          this.newUserProfiles = response.data;
        }
      })
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  getProfilePercent() {
    try {
      this._dashboardService.getProfileCompletepercentage().subscribe((response: any) => {
        if (response.success) {
          this.profilePercent = response?.percent
        }
      })
    } catch (e) {
      console.error(e);
    }
  }

  openVisitors(): void {
    this._router.navigate(['/discover'], { queryParams: { tab: 2 } });
  }

  onClickShowAll(type: string): void {
    if (type === 'discover') {
      this._router.navigate(['/discover'], { queryParams: { tab: 0 } });
    } else if (type === 'visitors') {
      this._router.navigate(['/discover'], { queryParams: { tab: 2 } });
    }
  }
}
