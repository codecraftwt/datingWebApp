import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  // { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
