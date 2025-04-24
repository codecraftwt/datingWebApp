import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { authGuard } from './_helper/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [authGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SigninComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'subscriptions', component: SubscriptionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
