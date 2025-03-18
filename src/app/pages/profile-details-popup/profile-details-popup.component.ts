import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProfileService } from '../../services/profile.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ITabData {
  title: string;
  items: string[];
}

@Component({
  selector: 'app-profile-details-popup',
  templateUrl: './profile-details-popup.component.html',
  styleUrl: './profile-details-popup.component.scss'
})

export class ProfileDetailsPopupComponent implements OnInit {

  tabsData: ITabData[] = [
    {
      title: 'Interests and Hobbies',
      items: [
        'Animals',
        'Art',
        'Being in nature',
        'Blogging',
        'Comedy',
        'Concerts',
        'Cooking',
        'Climate & environmental protection',
        'Cooking classes',
        'Crafts',
        'Dancing',
        'Family time',
        'Fashion & style',
        'Festivals',
        'Game night',
        'Gardening',
        'Going out',
        'History',
        'Hanging out with friends',
        'Internet',
        'Meditation',
        'Movies',
        'Music',
        'Painting & drawing',
        'Photography',
        'Reading',
        'Social media',
        'Sports',
        'TV',
        'Taking walks',
        'Theater',
        'Travel',
        'Video games',
        'Volunteering',
        'Wellness',
        'Writing'
      ]
    },
    {
      title: 'Sports',
      items: [
        'Dancing',
        'Diving',
        'Equestrian',
        'Fishing',
        'Formula One',
        'Golf',
        'Gymnastics',
        'Handball',
        'Hiking',
        'Hockey',
        'Jogging',
        'Kitesurfing',
        'Martial Arts/Fighting',
        'Motor Sports',
        'Mountain Biking',
        'Paddleboarding',
        'Padel',
        'Personal Fitness',
        'Pilates',
        'Rollerblading',
        'Rowing',
        'Rugby',
        'Skateboarding',
        'Snowboarding',
        'Soccer',
        'Sports Shooting',
        'Surfing',
        'Swimming',
        'Table Tennis',
        'Tennis',
        'Triathlon',
        'Volleyball',
        'Windsurfing',
        'Yoga'
      ]

    },
    {
      title: 'Food and Drinks',
      items: [
        'American food',
        'Asian food',
        'Barbecue/Soul food',
        'Caribbean food',
        'Cocktails',
        'Coffee',
        'Ethiopian food',
        'Farm to Table',
        'Fast Food',
        'Fine dining',
        'Flexitarian',
        'French food',
        'Greek food',
        'Home cooking',
        'Indian food',
        'Italian food',
        'Latin American food',
        'Mediterranean food',
        'Mexican food',
        'Middle Eastern food',
        'Organic food',
        'Pescatarian',
        'Seafood',
        'Smoothies',
        'Soup',
        'Spicy food',
        'Street food & food trucks',
        'Sushi',
        'Sweets',
        'Vegan',
        'Vegetarian'
      ]

    },
    {
      title: 'Travelling',
      items: [
        'Active Trips',
        'Adventure Trips',
        'All-Inclusive Trips',
        'Art & Culture Holidays',
        'Backpacking',
        'Beach Trips',
        'Bike Tours',
        'Camping',
        'City Trips',
        'Countryside Vacations',
        'Cruises',
        'Dining/Wine Tasting Trips',
        'Educational Trips',
        'Fishing Trips',
        'Group Travel',
        'Hiking Trips',
        'Long Distance Trails',
        'Meditation/Yoga Retreats',
        'Motorcycle Tours',
        'Mountains Trips',
        'Relaxation Trips',
        'Remote Working Trips',
        'Road Trips',
        'Spa/Wellness Trips',
        'Staycation',
        'Vanlife',
        'Winter Sports Trips'
      ]

    },
    {
      title: 'Languages',
      items: ['English', 'Hindi', 'Marathi', 'Kannada', 'Tamil', 'Telugu', 'Malyalam', 'Sanskrit']
    },
    {
      title: 'Character And Traits',
      items: [
        'Hardworking',
        'Intelligent',
        'Kind-hearted',
        'Loving',
        'Loyal',
        'Modest',
        'Open-minded',
        'Optimistic',
        'Organized',
        'Outgoing',
        'Passionate',
        'Patient',
        'Peaceful',
        'Rational',
        'Reflective',
        'Reliable',
        'Respectful',
        'Romantic',
        'Self-aware',
        'Spiritual',
        'Spontaneous',
        'Sweet',
        'Thoughtful',
        'Thrill-seeker',
        'Welcoming'
      ]

    },
    {
      title: 'lifeStyle',
      items: ['Quality', 'Standard','Test','Test1']
    },
  ];
  selectedIndex: number = 0;
  userDetailsForm!: FormGroup;
  user: any = localStorage.getItem('user');
  currentUser = JSON.parse(this.user).user;

  fieldMappings: { [key: string]: string } = {
    'Interests and Hobbies': 'interestsAndHobbies',
    'Sports': 'sports',
    'Food and Drinks': 'foodAndDrink',
    'Travelling': 'travelling',
    'Languages': 'languages',
    'Character And Traits': 'characterAndTraits',
    'lifeStyle': 'lifeStyle'
  };

  constructor(
    private _dialogRef: MatDialogRef<ProfileDetailsPopupComponent>,
    private readonly _profileService: ProfileService,
    private readonly _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public selectedTabTitle: string,
  ) {
    const index = this.tabsData.findIndex(tab => tab.title === selectedTabTitle);
    if (index !== -1) this.selectedIndex = index;

  }

  ngOnInit(): void {
    this._initializeForm();
    this._getUserDetails();
  }

  onTabChanged(event: MatTabChangeEvent) {
    this.selectedIndex = event.index;
    this.selectedTabTitle = this.tabsData[event.index].title;
  }

  onCancel(): void {
    this._dialogRef.close();
  }

  onSave(): void {
    if (this.userDetailsForm.valid) {
      const formData = this.userDetailsForm.value;
      console.log(formData,'formData');
      
      // this._profileService.updateUserDetails(this.currentUser._id, formData)
      //   .subscribe(() => {
      //     this._dialogRef.close(true);
      //   });
    }
  }
  // Add chip toggle functionality
  toggleSelection(tabTitle: string, item: string) {
    const formArray = this.getFormArray(tabTitle);
    const index = formArray.value.indexOf(item);

    if (index >= 0) {
      formArray.removeAt(index);
    } else {
      if (formArray.length < 4) {
        formArray.push(this._fb.control(item));
      }
    }
  }

  getFormArray(tabTitle: string) {
    const fieldName = this.fieldMappings[tabTitle];
    return this.userDetailsForm.get(fieldName) as FormArray;
  }

  private _initializeForm(): void {
    const formGroupConfig: any = {};
    
    this.tabsData.forEach(tab => {
      const fieldName = this.fieldMappings[tab.title];
      formGroupConfig[fieldName] = this._fb.array(
        [],
        [Validators.minLength(3), Validators.maxLength(4)]
      );
    });

    this.userDetailsForm = this._fb.group(formGroupConfig);
  }

  private _getUserDetails() {
    try { 
      let data = this._profileService.getUserDetails(this.currentUser._id);
      console.log(data,'data');
    } catch (error) {
      console.error(error);
    }
  }
}
