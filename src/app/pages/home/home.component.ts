import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selectedValue = ''
  age = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
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

  ngOnInit(): void {

  }

  onSelectionChange(event: any) {
    console.log(event,'<===')
    const selectedChip = event.source.value;
    console.log('Selected Chip:', selectedChip);
  }

  trackCategory(index: number, category: any) {
    return category.name; 
  }
}
