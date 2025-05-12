import { Component, inject, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../../edit-profile-dialog/edit-profile-dialog.component';
import { ProfileDetailsPopupComponent } from '../../profile-details-popup/profile-details-popup.component';
import { forkJoin } from 'rxjs';
import { BodyTypeService } from '../../../services/bodytype.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileDetailsComponent implements OnInit {
  currentUser: any;
  profileDetails: any;
  otherDetails: any;
  bodyType: string = '';
  isDragging = false;
  validFiles: File[] = [];
  uploadedPhotoBase64Strings: string[] = [];
  previewFiles: { name: string; url?: string }[] = [];
  errorMessage = '';
  private _modalService = inject(NgbModal);
  constructor(private readonly _profileService: ProfileService,
    private readonly _dialog: MatDialog,
    private readonly _bodyTypeService: BodyTypeService) {
  }

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    this.currentUser = JSON.parse(user).user;
    this.getProfileDetails();
  }

  onClickAdd(tabTitle: string) {
    const dialogRef = this._dialog.open(ProfileDetailsPopupComponent, {
      data: tabTitle,
      width: '750px',
      maxWidth: '90vw',
      height: '78vh',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProfileDetails();
      }
    });
  }

  handleEditProfile() {
    const dialogRef = this._dialog.open(EditProfileDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      height: '90vh',
      disableClose: false // Prevent closing by clicking outside
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProfileDetails();
    })
  }

  getProfileDetails(): void {
    const profile$ = this._profileService.getProfileById(this.currentUser._id);
    const user$ = this._profileService.getUserDetails(this.currentUser._id);

    forkJoin([profile$, user$]).subscribe({
      next: ([profileResponse, userResponse]: [any, any]) => {
        this.profileDetails = profileResponse.user;
        this.otherDetails = userResponse?.userDetails;
        this.calculateBodyType();

      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  calculateBodyType() {
    let height = this.profileDetails?.height;
    let weight = this.profileDetails?.weight;
    this.bodyType = this._bodyTypeService.getBodyType(height, weight);
  }

  onClickAddPhoto(content: TemplateRef<any>) {
    this._modalService.open(content, { centered: true });
  }

  handleFiles(files: FileList) {
    this.errorMessage = '';
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'text/plain'];
    const maxSize = 10 * 1024 * 1024;

    for (const file of Array.from(files)) {
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = `Unsupported file type: ${file.name}`;
        continue;
      }
      if (file.size > maxSize) {
        this.errorMessage = `File too large: ${file.name}`;
        continue;
      }

      // this.validFiles.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.uploadedPhotoBase64Strings.push(base64);
        this.previewFiles.push({ name: file.name, url: base64 });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  onUploadPhotos() {
    try {
      let otherPhotos = this.profileDetails.otherPhotos;
      this._profileService.updateProfile(this.currentUser._id, { otherPhotos: [...otherPhotos, ...this.uploadedPhotoBase64Strings] }).subscribe({
        next: (response) => {
          this.getProfileDetails();
          this._modalService.dismissAll();
        },
        error: (error) => {
          console.error('Error uploading photos:', error);
        },
      });

    } catch (e) {
      console.error(e);
    }
  }

}
