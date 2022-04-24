import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAssignmentsComponent } from './role-assignments.component';
import { RoleComponent } from './role.components';
// import {RoleAssignmentsComponent} from './role-assignments.component';
import { RolesComponent } from './roles.components';
import { UserComponent } from './user.component';
import { UsersComponent } from './users.component';
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
      { path: 'roles', component: RolesComponent },
      { path: 'admin/roles', redirectTo: 'roles' },
      { path: 'roles/add', component: RoleComponent },
      { path: 'roles/edit/:id', component: RoleComponent },
      { path: 'roles/assign/:id', component: RoleAssignmentsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'admin/users', redirectTo: 'users' },
      { path: 'users/add', component: UserComponent },
      { path: 'users/edit/:id', component: UserComponent },
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
