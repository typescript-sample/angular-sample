import {Component} from '@angular/core';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {RoleAssignmentsComponent} from './role-assignments.component';
// import {RoleComponent} from './role.components';
// import {RolesComponent} from './roles.components';
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
      // { path: 'users', component: UsersComponent },
      // { path: 'users/add', component: UserComponent },
      // { path: 'users/:id', component: UserComponent },
      { path: 'roles', component: RolesComponent},
      // { path: 'roles/add', component:  RoleComponent},
      // { path: 'roles/assign/:id', component:  RoleAssignmentsComponent},
      // { path: 'roles/:id', component: RoleComponent},
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
