import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedProfilesComponent } from './visited-profiles.component';

describe('VisitedProfilesComponent', () => {
  let component: VisitedProfilesComponent;
  let fixture: ComponentFixture<VisitedProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitedProfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitedProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
