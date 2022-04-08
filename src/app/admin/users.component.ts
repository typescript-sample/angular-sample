import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { navigate } from '@/app/common';
import { SearchComponent } from '@/app/common';
import { handleError, inputSearch } from 'uione';
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
  statusList: any = [];
  femaleIcon = "@/app/assets/images/female.png";
  maleIcon = "@/app/assets/images/female.png";
  ngOnInit() {
    this.onInit();
  }
  viewUser(userId: string) {
    navigate(this.router, 'users', [userId]);
  }
  edit(userId: string) {
    navigate(this.router, 'users', [userId]);
  }
  add() {
    navigate(this.router, 'users/add');
  }

  async load(s: UserFilter, autoSearch: boolean) {
    Promise.all([
      this.masterDataService.getStatus()
    ]).then(values => {
      const [statusList] = values;
      this.statusList = statusList;
      super.load(s, autoSearch);
    }).catch(handleError);
  }
}
