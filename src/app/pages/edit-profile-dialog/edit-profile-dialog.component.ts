import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss'
})
export class EditProfileDialogComponent implements OnInit {

  currentUser: any;
  profileDetails: any;
  userForm!: FormGroup;
  constructor(private readonly _profileService: ProfileService,
    private _dialogRef: MatDialogRef<EditProfileDialogComponent>,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    this.currentUser = JSON.parse(user).user;
    this.getProfileDetails();
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this._fb.group({
      profileFor: '',
      firstname: '',
      lastname: '',
      gender: '',
      email: '',
      phoneNumber: '',
      dob: '',
      country: '',
      religion: '',
      motherTongue: '',
      profilePhoto: '',
      otherPhotos: ['https://picsum.photos/300/200?random=1','https://picsum.photos/300/200?random=2','https://picsum.photos/300/200?random=3'],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileDetails.profilePhoto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    try {
      this._profileService.updateProfile(this.currentUser._id, this.userForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.closeDialog();
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  closeDialog(): void {
    this._dialogRef.close();
  }

  getProfileDetails(): void {
    this._profileService.getProfileById(this.currentUser._id).subscribe({
      next: (response: any) => {
        this.profileDetails = response.user;
        this.userForm.patchValue({
          profileFor: this.profileDetails.profileFor,
          firstname: this.profileDetails.firstName,
          lastname: this.profileDetails.lastName,
          gender: this.profileDetails.gender,
          email: this.profileDetails.email,
          phoneNumber: this.profileDetails.mobile,
          dob: this.profileDetails.dob,
          country: this.profileDetails.country,
          religion: this.profileDetails.religion,
          motherTongue: this.profileDetails.motherTongue,
          profilePhoto: this.profileDetails.profilePhoto
        });
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
