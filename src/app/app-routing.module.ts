import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ReviewComponent from './location/review.component';
import { AuthenticationService } from './shared/AuthenticationService';
import { MainComponent } from './shared/main.component';
// import { Error404Component } from './core/error404/error-404.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  {
    path: '', component: MainComponent, data: {
      title: 'Home'
    }, canActivate: [AuthenticationService], children: [
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule)
      },
      {
        path: 'locations/:id/review',
        component:ReviewComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
