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
  profileDetails: any

  ngOnInit(): void {
    this._activatedRouter.params.subscribe((params: any) => {
      this.selectedUserId = params.id
      this.getProfileDetails();
      this.handleVisit();
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
        console.log(error, '<======== error')
        // alert(error);
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
    }
    this._profileService.likeProfile(payload).subscribe({
      next: (response) => {
        this.getProfileDetails();
        // if (response.success) {
        //   this._router.navigate(['/messages']);
        // }
        // if (response.status === 400) {
        //   alert(response.message)
        // }
      },
      error: (error) => {
        console.log(error, '<======== error')
        // alert(error);
      }
    });
  }

  handleVisit() {
    let visitorsId = this.user._id;
    let visitedId = this.selectedUserId;
    console.log(visitorsId, visitedId, '<=== visitorsId,visitedId');
    try {
      this._discoverService.postVisit(visitorsId, visitedId).subscribe((response: any) => {
        console.log(response, '<==== response')
      })
    } catch (error) {
      console.log(error, 'e');
      throw error;
    }
  }
}
