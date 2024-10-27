import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { navigate, SearchComponent } from 'angularx';
import { inputSearch } from 'uione';
import { MasterDataClient } from './service/master-data';
import { User, UserClient, UserFilter } from './service/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './users.html',
  providers: [UserClient]
})
export class UsersComponent extends SearchComponent<User, UserFilter> implements OnInit {
  constructor(viewContainerRef: ViewContainerRef, protected router: Router, userService: UserClient, protected masterDataService: MasterDataClient) {
    super(viewContainerRef, userService, inputSearch());
  }
  addable: boolean = true;
  statusList: any = [];
  femaleIcon = "app/assets/images/female.png";
  maleIcon = "app/assets/images/female.png";
  viewable: boolean = true;
  editable: boolean = true;
  ngOnInit() {
    this.hideFilter=true;
    this.onInit();
  }
  edit(userId: string) {
    navigate(this.router, 'admin/users/edit', [userId]);
  }
  add() {
    navigate(this.router, 'admin/users/add');
  }
  // async load(s: UserFilter, autoSearch: boolean) {
  //   Promise.all([
  //     this.masterDataService.getStatus()
  //   ]).then(values => {
  //     const [statusList] = values;
  //     this.statusList = statusList;
  //     super.load(s, autoSearch);
  //   }).catch(handleError);
  // }
}
