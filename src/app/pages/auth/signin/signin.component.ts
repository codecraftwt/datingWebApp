import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  hide = signal(true);
  accFor = ['Myself', 'My Son', 'My Daughter', 'My Sister', 'My Brother', 'My Relative', 'My Friend']
  accForSelected: string = ''
  gender: string = ''
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  religion: any[] = [
    { id: 1, name: 'Hindu' },
    { id: 2, name: 'Christian' },
    { id: 3, name: 'Islam' },
    { id: 4, name: 'Buddhist' },
    { id: 5, name: 'Jewish' },
  ];
  community: any[] = ['Marathi', 'Tamil', 'Hindi', 'English', 'Kannada', 'Urdu', 'Malyalam', 'Telugu', 'French', 'Japanese']
  country: any[] = ['India', 'Austrelia', 'Canada', 'Kuwait', 'New Zealand', 'Pakistan', 'USA', 'UAE', 'UK']

  firstFormGroup = this._formBuilder.group({
    profileFor: ['', Validators.required],
    gender: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['']
  });
  religionFormGroup = this._formBuilder.group({
    religion: ['', Validators.required],
    motherTongue: ['', Validators.required],
    country: ['', Validators.required],
  });
  phoneFormGroup = this._formBuilder.group({
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    password: ['', Validators.required],
  });

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

  handleSubmit() {
    const payload = {
      ...this.firstFormGroup.getRawValue(),
      ...this.secondFormGroup.getRawValue(),
      ...this.religionFormGroup.getRawValue(),
      ...this.phoneFormGroup.getRawValue()
    };
    console.log(payload, 'payload')
    this._authService.register(payload).subscribe(response => {
      if (response.success) {
        this.firstFormGroup.reset()
        this.secondFormGroup.reset()
        this.religionFormGroup.reset()
        this.phoneFormGroup.reset()
        this._router.navigate(['/login']);
      }
    })
  }
}
