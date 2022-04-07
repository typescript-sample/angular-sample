import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { Error404Component } from './core/error404/error-404.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', loadChildren: ()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)},
  // {path: '404', component: Error404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
