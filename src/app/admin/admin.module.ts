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
    UsersLookupComponent
  ],
  entryComponents: [],
  providers: [
    RoleClient,
    MasterDataClient,
    UserClient,
  ]
})
export class AdminModule {
}

