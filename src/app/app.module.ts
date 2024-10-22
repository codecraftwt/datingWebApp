import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './components/shared/shared.module';
import { DiscoverComponent } from './components/discover/discover.component';
import { ProfileCardComponent } from './components/common/profile-card/profile-card.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { VisitorsComponent } from './components/visitors/visitors.component';
import { VisitedProfilesComponent } from './components/visited-profiles/visited-profiles.component';

@NgModule({
  declarations: [
    AppComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
