import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnInit {
  @Input({ required: true }) profile: any;

  ngOnInit(): void {
    console.log(this.profile,'profile')
  }
}
