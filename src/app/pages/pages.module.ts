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
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
