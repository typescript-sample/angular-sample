import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from '../shared/modal/modal.module';
import { AdminComponent, AdminRoutes } from './admin.component';
import { RoleAssignmentsComponent } from './role-assignments.component';
import { RoleComponent } from './role.components';
import { RolesComponent } from './roles.components';
import { MasterDataClient } from './service/master-data';
import { RoleClient } from './service/role';
import { UserClient } from './service/user';
import { UserComponent } from './user.component';
import { UsersLookupComponent } from './users-lookup.component';
import { UsersComponent } from './users.component';
import { ArticleClient } from './service/article';
import { ArticlesComponent } from './articles.component';
import { ArticleComponent } from './article.component';
import { ItemClient } from './service/item';
import { ItemsComponent } from './items.component';
import { ItemComponent } from './item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutes,
    ReactiveFormsModule,
    ModalModule,
    // BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    // BsDatepickerModule.forRoot(),
    // TimepickerModule.forRoot(),
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    // NgxPaginationModule
  ],
  declarations: [
    AdminComponent,
    RolesComponent,
    RoleComponent,
    UsersComponent,
    UserComponent,
    RoleAssignmentsComponent,
    UsersLookupComponent,
    ArticlesComponent,
    ArticleComponent,
    ItemsComponent,
    ItemComponent
  ],
  entryComponents: [],
  providers: [
    RoleClient,
    MasterDataClient,
    UserClient,
    ArticleClient,
    ItemClient
  ]
})
export class AdminModule {
}

