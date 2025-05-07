import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      brideName: 'Manjit',
      groomName: 'Avneet',
      image: 'marriage1.jpeg'
    },
    {
      brideName: 'Mahesh',
      groomName: 'Suchitra',
      image: 'marriage2.jpeg'
    },
    {
      brideName: 'Arindam',
      groomName: 'Paromita',
      image: 'marriage3.jpeg'
    },
    {
      brideName: 'Keshav',
      groomName: 'Anupama',
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

  heroImages = [
    'https://images.pexels.com/photos/2055225/pexels-photo-2055225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/254069/pexels-photo-254069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/853406/pexels-photo-853406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2055236/pexels-photo-2055236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/802374/pexels-photo-802374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2174662/pexels-photo-2174662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ]

  activeSlideIndex = 0;

  menus = [
    {
      route: '',
      name: 'Home'
    },
    {
      route: '',
      name: 'About Us'
    },
    {
      route: '',
      name: 'Subscriptions'
    },
    {
      route: '',
      name: 'Contact Us'
    },
    {
      route: '',
      name: 'Blogs'
    },
  ]
  public plans = [
    {
      _id: '67d2bfd29e2d36d591eed930',
      name: 'Free',
      description: 'Access to all basic features',
      price: 1999,
      duration: 90,
      features: [
        'Basic features',
        'Limited Photos View',
        'Limited Messaging',
        'Limited Profile Options',
        'No Profile match Feature'
      ],
      isActive: true,
      currency: 'INR',
      trialPeriod: 7,
      createdAt: '2025-03-13T11:21:54.156Z',
      updatedAt: '2025-03-13T11:21:54.156Z',
      __v: 0
    },
    {
      _id: '67d2c03e9e2d36d591eed932',
      name: 'Premium PLUS',
      description: 'Access to all Premium features',
      price: 3999,
      duration: 90,
      features: [
        'Advanced features',
        'Unlimited Photos View',
        'Unlimited Messaging',
        'Unlimited Profile Options',
        'Basic Profile match Feature'
      ],
      isActive: true,
      currency: 'INR',
      trialPeriod: 7,
      createdAt: '2025-03-13T11:23:42.387Z',
      updatedAt: '2025-03-13T11:23:42.387Z',
      __v: 0
    },
    {
      _id: '67d2c0b49e2d36d591eed934',
      name: 'Premium ULTRA',
      description: 'Access to all Premium Ultra features',
      price: 5999,
      duration: 90,
      features: [
        'Advanced features',
        'Unlimited Photos View',
        'Unlimited Messaging',
        'Unlimited Profile Options',
        'Adavanced Profile match Feature'
      ],
      isActive: true,
      currency: 'INR',
      trialPeriod: 7,
      createdAt: '2025-03-13T11:25:40.092Z',
      updatedAt: '2025-03-13T11:25:40.092Z',
      __v: 0
    }
  ];

  constructor(
    private _fb: FormBuilder,
    public router: Router) { }

  ngOnInit(): void {
    this._intializeForm();
    setInterval(() => {
      this.activeSlideIndex = (this.activeSlideIndex + 1) % this.heroImages.length;
    }, 5000);
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
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  isPasswordMismatch() {
    return this.UserForm.hasError('mismatch') && this.UserForm.get('confirmPassword')?.touched;
  }

  onSubmit() {
    this.router.navigate(['login']);
  }

  onSelectionChange(event: any) {
    const selectedChip = event.source.value;
  }

  trackCategory(index: number, category: any) {
    return category.name;
  }
}
