import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { buildFromUrl, initElement, navigate, BaseSearchComponent } from 'angularx';
import { handleError, inputSearch, registerEvents, storage } from 'uione';
import { MasterDataClient } from './service/master-data';
import { Role, RoleClient, RoleFilter } from './service/role';

@Component({
  selector: 'app-role-list',
  templateUrl: './roles.html',
  providers: [RoleClient, MasterDataClient]
})
export class RolesComponent extends BaseSearchComponent<Role, RoleFilter> implements OnInit {
  constructor(protected viewContainerRef: ViewContainerRef, protected router: Router, roleService: RoleClient, private masterDataService: MasterDataClient) {
    super(roleService, inputSearch());
  }
  status:any = [];
  addable: boolean = true;

  ngOnInit() {
    this.form = initElement(this.viewContainerRef, registerEvents);
    const s = this.mergeFilter(buildFromUrl(), ['ctrlStatus', 'userType']);
    this.init(s, storage.autoSearch);
    this.hideFilter = true;
  }
  init(s: RoleFilter, auto: boolean) {
    Promise.all([
      this.masterDataService.getStatus()
    ]).then(values => {
      const [status] = values;
      this.status = status;
      this.load(s, auto);
    }).catch(handleError);
  }
  viewRole(roleId:string) {
    navigate(this.router, 'roles', [roleId]);
  }

  edit(roleId:string) {
    navigate(this.router, 'roles/edit', [roleId]);
  }

  addRole() {    
    navigate(this.router, 'roles/add');
  }
}
