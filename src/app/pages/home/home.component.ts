import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { OnBhalfOf } from '../enums/home-enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  UserForm!: FormGroup;
  onBehalfOf = Object.values(OnBhalfOf);
  selectedValue = '';
  isEmail: boolean = false;
  age = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  countries = ['India', 'China', 'Japan', 'United States', 'Australia', 'New Zealand', 'South Africa', 'England', 'France', 'Germany', 'Italy', 'Spain', 'Portugal', 'Brazil', 'Argentina', 'Mexico', 'Canada', 'Russia', 'Ukraine',];
  religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Bahai', 'Parsi', 'Jewish', 'Communist', 'Atheist', 'Agnostic', 'Other'];
  whatYouGet = [
    {
      title: '9000+ Members',
      image: 'group',
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora ab sint dolore quaerat dolores,
                    odit consectetur odio quisquam non harum error illo vitae libero tenetur pariatur.`
    },
    {
      title: 'Personally Verified',
      image: 'verified_user',
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora ab sint dolore quaerat dolores,
                    odit consectetur odio quisquam non harum error illo vitae libero tenetur pariatur.`
    },
    {
      title: '100% Privacy',
      image: 'lock',
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora ab sint dolore quaerat dolores,
                    odit consectetur odio quisquam non harum error illo vitae libero tenetur pariatur.`
    },
  ]

  marriageStories = [
    {
      brideName: 'Pinky',
      groomName: 'Guddu',
      image: 'marriage1.jpeg'
    },
    {
      brideName: 'Pinky',
      groomName: 'Guddu',
      image: 'marriage2.jpeg'
    },
    {
      brideName: 'Pinky',
      groomName: 'Guddu',
      image: 'marriage3.jpeg'
    },
    {
      brideName: 'Pinky',
      groomName: 'Guddu',
      image: 'marriage4.jpeg'
    },
    // {
    //   brideName: 'Pinky',
    //   groomName: 'Guddu',
    //   image: 'marriage5.jpeg'
    // },
  ]

  aboutUs = [
    'Most trusted Matrimony service.',
    'Personally verified profile by visit',
    'Connect on phone, chat, video call',
    '9999+ of profile for perfect match',
    '12+ year of excellence service',
    'Personal assistance for meeting',
    'User friendly Mobile App'
  ]
  choicesCatecories: any[] = [
    {
      name: 'Language',
      choices: ['Marathi', 'Tamil', 'Hindi', 'English', 'Kannada', 'Urdu', 'Malyalam', 'Telugu', 'French', 'Japanese'],
    },
    {
      name: 'Belief',
      choices: ['Belief1', 'Belief2', 'Belief3', 'Belief4', 'Belief5']
    },
    {
      name: 'Community',
      choices: ['No Caste Bar', 'Hindu', 'Christian', 'Muslim', 'Sikh', 'Buddhisht', 'Jain', 'Bahai', 'Parsi', 'Jewish', 'Communist']
    },
    {
      name: 'Occupation',
      choices: ['Business', 'Engineer', 'Doctor', 'Teacher', 'Artist']
    },
    {
      name: 'Nationality',
      choices: ['Indian', 'Chinese', 'Japanese', 'Amerikan']
    }
  ];

  constructor(
    private _fb: FormBuilder,
    private router: Router) { }
  ngOnInit(): void {
    this._intializeForm();
  }

  _intializeForm() {
    this.UserForm = this._fb.group({
      profileFor: '',
      firstname: '',
      lastname: '',
      gender: '',
      email: '',
      phoneNumber: '',
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      dob: '',
      country: '',
      religion: '',
      motherTongue: '',

      // height: [''],  // Height
      // weight: [''],  // Weight
      // caste: [''],  // Caste
      // maritalStatus: [''],  // Marital Status
      // education: [''],  // Education
      // occupation: [''],  // Occupation
      // city: [''],  // City
      // state: [''],  // State
      // language: [''],  // Language
      // community: [''],  // Community
      // about: [''],  // About
    },{ validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    console.log(password,'password');
    console.log(confirmPassword,'confirmPassword');
    console.log(password === confirmPassword,'password === confirmPassword');
    
    return password === confirmPassword ? null : { mismatch: true };
  }
  isPasswordMismatch() {
    return this.UserForm.hasError('mismatch') && this.UserForm.get('confirmPassword')?.touched;
  }
  onSubmit() {
    console.log(this.UserForm.value), 'UserForm.values';
    this.router.navigate(['login']);
  }

  onSelectionChange(event: any) {
    const selectedChip = event.source.value;
  }

  trackCategory(index: number, category: any) {
    return category.name;
  }
}
