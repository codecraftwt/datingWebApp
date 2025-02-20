import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { ProfileService } from '../../services/profile.service';

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
  currentUser: any = localStorage.getItem('user')
  user = JSON.parse(this.currentUser).user
  selectedUserId = ''
  profileDetails: any

  ngOnInit(): void {
    this._activatedRouter.params.subscribe((params: any) => {
      console.log(params, '<==== params');
      this.selectedUserId = params.id
      this.getProfileDetails();
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
    console.log('cretateroom')
    const payload = {
      createdBy: this.user._id,
      createdWith: this.selectedUserId
    }

    this._socketService.createRoom(payload).subscribe({
      next: (response) => {
        console.log(response, 'create room response');
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
    console.log('handle message')
    this.createRoom();
  }

  handleLike(){
    const payload ={
      userId:this.user._id,
      likedProfileId:this.selectedUserId
    }
    this._profileService.likeProfile(payload).subscribe({
      next: (response) => {
        console.log(response, 'Like profile response');
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

}
