import { Component, Injectable, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { buildFromUrl, initElement, navigate, BaseSearchComponent } from '@/app/common';
import { handleError, inputSearch, registerEvents, storage } from 'uione';
import { MasterDataClient } from './service/master-data';
import { Role, RoleClient, RoleFilter } from './service/role';

@Component({
  selector: 'app-access-role-list',
  templateUrl: './roles.html',
  providers: [RoleClient, MasterDataClient]
})
export class RolesComponent extends BaseSearchComponent<Role, RoleFilter> implements OnInit {
  constructor(protected viewContainerRef: ViewContainerRef, protected router: Router, roleService: RoleClient, private masterDataService: MasterDataClient) {
    super(roleService, inputSearch());
  }
  
  status = [];

  ngOnInit() {
    this.form = initElement(this.viewContainerRef, registerEvents);
    const s = this.mergeFilter(buildFromUrl(), ['ctrlStatus', 'userType']);
    this.init(s, storage.autoSearch);
    
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
  viewRole(roleId) {
    navigate(this.router, 'roles', [roleId]);
  }

  edit(roleId) {
    navigate(this.router, 'roles', [roleId]);
  }

  addRole() {    
    navigate(this.router, 'roles/add');
  }

  assign(roleId) {
    navigate(this.router, `roles/assign`, [roleId]);
  }
}
