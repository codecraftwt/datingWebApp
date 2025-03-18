import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsPopupComponent } from './profile-details-popup.component';

describe('ProfileDetailsPopupComponent', () => {
  let component: ProfileDetailsPopupComponent;
  let fixture: ComponentFixture<ProfileDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileDetailsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
