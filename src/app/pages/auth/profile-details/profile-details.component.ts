import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent implements OnInit {
  currentUser: any;
  profileDetails: any;
  constructor(private readonly _profileService: ProfileService) {}

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    this.currentUser = JSON.parse(user).user;
    this.getProfileDetails();
  }

  getProfileDetails(): void {
    console.log(this.currentUser,'<=== currentUser')
    this._profileService.getProfileById(this.currentUser._id).subscribe({
      next: (response: any) => {
        console.log(response,'<==== response')
        this.profileDetails = response.user;
        console.log(this.profileDetails,'<=== profileUsers')
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
