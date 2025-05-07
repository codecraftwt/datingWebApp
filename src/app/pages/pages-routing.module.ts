import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiscoverComponent } from '../components/discover/discover.component';
import { LikesComponent } from './likes/likes.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MessagesComponent } from './messages/messages.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ProfileDetailsComponent } from './auth/profile-details/profile-details.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: '', redirectTo: 'dashoard', pathMatch: 'full' },
      { path: 'dashoard', component: DashboardComponent },
      { path: 'discover', component: DiscoverComponent },
      { path: 'likes', component: LikesComponent },
      { path: 'profile/:id', component: ProfileInfoComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'profile-details', component: ProfileDetailsComponent },
      { path: 'subscriptions', component: SubscriptionsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
