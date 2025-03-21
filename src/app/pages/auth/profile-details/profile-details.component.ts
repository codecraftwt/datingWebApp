import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../../edit-profile-dialog/edit-profile-dialog.component';
import { ProfileDetailsPopupComponent } from '../../profile-details-popup/profile-details-popup.component';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent implements OnInit {
  currentUser: any;
  profileDetails: any;
  otherDetails: any;
  constructor(private readonly _profileService: ProfileService,
    private readonly _dialog: MatDialog,) {
  }

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    this.currentUser = JSON.parse(user).user;
    this.getProfileDetails();
  }

  onClickAdd(tabTitle: string) {
    this._dialog.open(ProfileDetailsPopupComponent, {
      data: tabTitle,
      width: '750px',
      maxWidth: '90vw',
      height: '78vh',
      disableClose: false
    });
  }

  handleEditProfile() {
    this._dialog.open(EditProfileDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      height: '90vh',
      disableClose: false // Prevent closing by clicking outside
    });
  }

  getProfileDetails(): void {
    const profile$ = this._profileService.getProfileById(this.currentUser._id);
    const user$ = this._profileService.getUserDetails(this.currentUser._id);

    forkJoin([profile$, user$]).subscribe({
      next: ([profileResponse, userResponse]) => {
        this.profileDetails = profileResponse.user;
        this.otherDetails = userResponse;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }
}
