import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './auth/login/login.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../components/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileCardComponent } from '../components/common/profile-card/profile-card.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { VisitorsComponent } from '../components/visitors/visitors.component';
import { VisitedProfilesComponent } from '../components/visited-profiles/visited-profiles.component';
import { DiscoverComponent } from '../components/discover/discover.component';
import { LikesComponent } from './likes/likes.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MessagesComponent } from './messages/messages.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ProfileDetailsComponent } from './auth/profile-details/profile-details.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProfileDetailsPopupComponent } from './profile-details-popup/profile-details-popup.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    PagesComponent,
    LoginComponent,
    SigninComponent,
    HomeComponent,
    DashboardComponent,
    ProfileCardComponent,
    FavoritesComponent,
    VisitorsComponent,
    DiscoverComponent,
    VisitedProfilesComponent,
    LikesComponent,
    ProfileInfoComponent,
    MessagesComponent,
    SubscriptionsComponent,
    ProfileDetailsComponent,
    EditProfileDialogComponent,
    ProfileDetailsPopupComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    NgxFileDropModule,
    InfiniteScrollModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ]
})
export class PagesModule { }
