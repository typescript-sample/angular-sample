import {Component} from '@angular/core';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {RoleAssignmentsComponent} from './role-assignments.component';
import {RolesComponent} from './roles.components';
// import {UserComponent} from './user.component';
// import {UsersComponent} from './users.component';

@Component({
  selector: 'app-admin-module',
  template: '<router-outlet></router-outlet>'
})
export class AdminComponent {
  constructor() {
  }
}

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
     
      { path: 'roles', component: RolesComponent},
      { path: 'admin/roles', redirectTo:'roles'},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [

  ],
  exports: [
    RouterModule,
  ]
})
export class AdminRoutes {
}
