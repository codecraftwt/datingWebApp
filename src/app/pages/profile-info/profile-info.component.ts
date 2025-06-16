import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { ProfileService } from '../../services/profile.service';
import { DiscoverService } from '../../services/discover.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent implements OnInit {
  private _activatedRouter = inject(ActivatedRoute);
  private _router = inject(Router);
  private _socketService = inject(SocketService)
  private _profileService = inject(ProfileService)
  private _discoverService = inject(DiscoverService)
  currentUser: any = localStorage.getItem('user')
  user = JSON.parse(this.currentUser).user
  selectedUserId = ''
  profileDetails: any;
  isProfileLiked: boolean = false;
  isPremium: boolean = true;

  ngOnInit(): void {
    let userData: any = localStorage.getItem('user')
    const user = JSON.parse(userData)
    if (user.user.subscriptionPlan === "free" || user.user.subscription.status === "inactive") {
      this.isPremium = false
    }
    this._activatedRouter.params.subscribe((params: any) => {
      this.selectedUserId = params.id;
      this.getProfileDetails();
      this.handleVisit();
      this.checkIsLiked();
    })
  }
  getProfileDetails(): void {
    this._profileService.getProfileById(this.selectedUserId).subscribe({
      next: (response: any) => {
        this.profileDetails = response.user;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  checkIsLiked() {
    this._profileService.checkLike(this.user._id, this.selectedUserId).subscribe((response: any) => {
      if (response.success) {
        this.isProfileLiked = response.like.isLike;
      }
    }, (error) => {
      throw error;
    });
  }

  createRoom(): void {
    const payload = {
      createdBy: this.user._id,
      createdWith: this.selectedUserId
    }

    this._socketService.createRoom(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this._router.navigate(['/messages']);
        }
        if (response.status === 400) {
          this._router.navigate(['/messages']);
        }
      },
      error: (error) => {
        throw error;
      }
    });
  }

  handleMessage() {
    this.createRoom();
  }

  handleLike() {
    const payload = {
      userId: this.user._id,
      likedProfileId: this.selectedUserId
    };

    this._profileService.likeProfile(payload).subscribe({
      next: (response) => {
        if (response) {
          this.isProfileLiked = !this.isProfileLiked; // Toggle UI immediately
          this.getProfileDetails(); // Refresh profile details after update
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  handleVisit() {
    let visitorsId = this.user._id;
    let visitedId = this.selectedUserId;
    try {
      this._discoverService.postVisit(visitorsId, visitedId).subscribe((response: any) => {
      })
    } catch (error) {
      throw error;
    }
  }
}
