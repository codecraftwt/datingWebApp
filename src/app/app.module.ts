import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './components/shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './_helper/jwt.interceptor';
import { errorInterceptor } from './_helper/error.interceptor';

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
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor]),
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
