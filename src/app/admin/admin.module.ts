import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent, AdminRoutes } from './admin.component';
import { ModalComponent } from './modal.component';
import { RoleAssignmentsComponent } from './role-assignments.component';
import { RoleComponent } from './role.components';
// import { ModalComponent } from './modal.component';
// import { RoleAssignmentsComponent } from './role-assignments.component';
// import { RoleComponent } from './role.components';
import { RolesComponent } from './roles.components';
import { MasterDataClient } from './service/master-data';
import { RoleClient } from './service/role';
import { UserClient } from './service/user';
import { UserComponent } from './user.component';
import { UsersLookupComponent } from './users-lookup.component';
import { UsersComponent } from './users.component';
// import { UserClient } from './service/user';
// import { UserComponent } from './user.component';
// import { UsersLookupComponent } from './users-lookup.component';
// import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutes,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    NgxPaginationModule
  ],
  declarations: [
    AdminComponent,
    RolesComponent,
    RoleComponent,
    UsersComponent,
    UserComponent,
    RoleAssignmentsComponent,
    ModalComponent,
    UsersLookupComponent
  ],
  entryComponents: [],
  exports: [
  ],
  providers: [
    RoleClient,
    MasterDataClient,
    UserClient,
  ]
})
export class AdminModule {
}

