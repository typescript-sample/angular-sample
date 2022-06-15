import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAssignmentsComponent } from './role-assignments.component';
import { RoleComponent } from './role.components';
import { RolesComponent } from './roles.components';
import { UserComponent } from './user.component';
import { UsersComponent } from './users.component';
import { ArticlesComponent } from './articles.component';
import { ArticleComponent } from './article.component';
import { ItemsComponent } from './items.component';
import { ItemComponent } from './item.component';

@Component({
  selector: 'app-admin-module',
  template: '<router-outlet></router-outlet>'
})
export class AdminComponent {
  constructor() {}
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

      { path: 'articles', component: ArticlesComponent },
      { path: 'admin/articles', redirectTo: 'articles' },
      { path: 'articles/edit/:id', component: ArticleComponent },
      { path: 'articles/add', component: ArticleComponent },

      { path: 'items', component: ItemsComponent },
      { path: 'admin/items', redirectTo: 'items' },
      { path: 'items/edit/:id', component: ItemComponent },
      { path: 'items/add', component: ItemComponent },
      
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
export class AdminRoutes {}
