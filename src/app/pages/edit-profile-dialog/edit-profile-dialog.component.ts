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
  maxDate!: Date;

  constructor(
    private readonly _profileService: ProfileService,
    private _dialogRef: MatDialogRef<EditProfileDialogComponent>,
    private _fb: FormBuilder
  ) { 
    this.maxDate = this.calculateMaxDate(18);
  }

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    this.currentUser = JSON.parse(user).user;
    this.initializeForm();
    this.getProfileDetails();
  }

  calculateMaxDate(age: number): Date {
    const today = new Date();
    today.setFullYear(today.getFullYear() - age);
    return today;
  }

  initializeForm(): void {
    this.userForm = this._fb.group({
      profileFor: '',
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      mobile: '',
      dob: '',
      country: '',
      religion: '',
      motherTongue: '',
      profilePhoto: '',
      // otherPhotos: [
      //   'https://picsum.photos/300/200?random=1',
      //   'https://picsum.photos/300/200?random=2',
      //   'https://picsum.photos/300/200?random=3'
      // ],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileDetails.profilePhoto = reader.result as string;
        console.log(this.profileDetails.profilePhoto, '<=== profilePhoto');
        // this.userForm.patchValue({ profilePhoto: this.profileDetails.profilePhoto });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    try {
      const updatedFormValue = {
        ...this.userForm.value,
        otherPhotos: [
          'https://picsum.photos/300/200?random=1',
          'https://picsum.photos/300/200?random=2',
          'https://picsum.photos/300/200?random=3'
        ]
      };
      this._profileService.updateProfile(this.currentUser._id, updatedFormValue).subscribe({
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
        if (this.profileDetails) {
          this.userForm.patchValue({
            profileFor: this.profileDetails.profileFor,
            firstName: this.profileDetails.firstName,
            lastName: this.profileDetails.lastName,
            gender: this.profileDetails.gender,
            email: this.profileDetails.email,
            mobile: this.profileDetails.mobile,
            dob: this.profileDetails.dob,
            country: this.profileDetails.country,
            religion: this.profileDetails.religion,
            motherTongue: this.profileDetails.motherTongue,
            profilePhoto: this.profileDetails.profilePhoto
          });
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
