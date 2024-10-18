import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['']
  });
  phoneFormGroup = this._formBuilder.group({
    email: ['', Validators.required],
    phone: ['', Validators.required],
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSelectionChange(e: any) {
    this.accForSelected = e
    // this.gender
  }

  handleSubmit() {
    // console.warn(this.loginForm.value);

  }
}
