import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { FileValidator } from '../validator/file-validator';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedBiodataFile: File | null = null;
  hide = signal(true);
  accFor = ['Myself']
  accForSelected: string = ''
  gender: string = ''
  maxDate!: Date;
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _snackbarService = inject(SnackbarService);
  private _router = inject(Router);

  religion: any[] = [
    { id: 1, name: 'Hindu' },
    { id: 2, name: 'Christian' },
    { id: 3, name: 'Islam' },
    { id: 4, name: 'Buddhist' },
    { id: 5, name: 'Jewish' },
  ];
  community: any[] = ['Marathi', 'Tamil', 'Hindi', 'English', 'Kannada', 'Urdu', 'Malyalam', 'Telugu', 'French', 'Japanese']
  country: any[] = ['India', 'Australia', 'Canada', 'Kuwait', 'New Zealand', 'Pakistan', 'USA', 'UAE', 'UK']

  firstFormGroup = this._formBuilder.group({
    profileFor: ['', Validators.required],
    gender: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+(?: [A-Za-z]+)*$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+(?: [A-Za-z]+)*$')]],
    dob: ['', [Validators.required]]
  });
  religionFormGroup = this._formBuilder.group({
    religion: ['', Validators.required],
    motherTongue: ['', Validators.required],
    country: ['', Validators.required],
  });
  phoneFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, this.mobileValidator]],
    password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
  });
  personalityProfileFormGroup = this._formBuilder.group({
    searchingFor: ['', [Validators.required]],
    height: ['', []],
    weight: ['', []],
    education: ['', []],
    hobbies: ['', []],
    designation: ['', []],
    biodata: [null as File | null, [Validators.required, FileValidator]]
  });

  mobileValidator(control: any) {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(control.value) ? null : { invalidMobile: true };
  }

  passwordValidator(control: any) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(control.value) ? null : { weakPassword: true };
  }

  constructor() {
    this.maxDate = this.calculateMaxDate(18);
  }

  ngOnInit(): void {
  }

  calculateMaxDate(age: number): Date {
    const today = new Date();
    today.setFullYear(today.getFullYear() - age); // Subtract 18 years from today's date
    return today;
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSelectionChange(e: any) {
    this.accForSelected = e
    this.firstFormGroup.controls.profileFor.setValue(e);
    if (e === 'My Son' || e === 'My Brother') {
      this.firstFormGroup.controls.gender.setValue('Male');
    }
    if (e === 'My Daughter' || e === 'My Sister') {
      this.firstFormGroup.controls.gender.setValue('Female');
    }
  }

  // Handle file drop event
  onFileDrop(files: NgxFileDropEntry[]) {
    const fileEntry = files[0].fileEntry as FileSystemFileEntry;

    fileEntry.file((file: File) => {
      this.selectedBiodataFile = file;
      this.personalityProfileFormGroup.patchValue({ biodata: file });
    });
  }


  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedBiodataFile = file;
      this.personalityProfileFormGroup.patchValue({ biodata: file });
    }
  }

  handleSubmit() {
    const payload = {
      ...this.firstFormGroup.getRawValue(),
      ...this.secondFormGroup.getRawValue(),
      ...this.religionFormGroup.getRawValue(),
      ...this.phoneFormGroup.getRawValue(),
      ...this.personalityProfileFormGroup.getRawValue()
    };
    console.log(payload, 'payload')
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.religionFormGroup.valid && this.phoneFormGroup.valid) {
      this._authService.register(payload).subscribe(response => {
        if (response.success) {
          this.firstFormGroup.reset()
          this.secondFormGroup.reset()
          this.religionFormGroup.reset()
          this.phoneFormGroup.reset()
          this._snackbarService.open(response.message, 'success')
          this._router.navigate(['/login']);
        } else {
          this._snackbarService.open(response.error, 'success')
        }
      })
    }
  }
}
