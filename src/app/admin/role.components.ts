import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditComponent } from '@/app/common';
import { handleError, inputEdit } from 'uione';
import { MasterDataClient } from './service/master-data';
import { Privilege, Role, RoleClient } from './service/role';

@Component({
  selector: 'app-access-role-detail',
  templateUrl: './role.html',
  providers: [RoleClient, MasterDataClient]
})
export class RoleComponent extends EditComponent<Role, any> implements OnInit {
  constructor(viewContainerRef: ViewContainerRef, route: ActivatedRoute, private roleService: RoleClient, private masterDataService: MasterDataClient, protected router: Router) {
    super(viewContainerRef, route, roleService, inputEdit());
    this.patchable = false;
  }
  role: Role;
  checkedAll: boolean;
  keyword: string;

  all?: string[];
  allPrivileges: Privilege[];
  shownPrivileges: Privilege[];
  statusList: any = [];
  disabled: boolean;
  ngOnInit() {
    this.onInit();    
  }
  load(id: any) {
    Promise.all([
      this.masterDataService.getStatus(),
      this.roleService.getPrivileges()
    ]).then(values => {
      const [status, allPrivileges] = values;
      
      const all: string[] = [];
      this.statusList = status;
      this.buildAll(all, allPrivileges);
      this.all = all;
      this.allPrivileges = allPrivileges;
      this.shownPrivileges = allPrivileges;
      super.load(id);
    }).catch(handleError);
  }

  buildAll(privileges: string[], all: Privilege[]): void {
    for (const root of all) {
      privileges.push(root.id);
      if (root.children && root.children.length > 0) {
        this.buildAll(privileges, root.children);
      }
    }
  }

  onChangeKeyword(event) {
    const keyword = event.target.value;
    const { allPrivileges } = this;
    this.shownPrivileges = this.buildShownModules(keyword, allPrivileges);
  }

  buildShownModules(keyword: string, allPrivileges: Privilege[]): Privilege[] {
    if (!keyword || keyword === '') {
      return allPrivileges;
    }
    const w = keyword.toLowerCase();
    const shownPrivileges = allPrivileges.map(parent => {
      const parentCopy = Object.assign({}, parent);
      if (parentCopy.children) {
        parentCopy.children = parentCopy.children.filter(child => child.name.toLowerCase().includes(w));
      }
      return parentCopy;
    }).filter(item => item.children && item.children.length > 0 || item.name.toLowerCase().includes(w));
    return shownPrivileges;
  }

  checkedRole(privilegesOfRoleId: string[], module: Privilege, allPrivileges: Privilege[]) {
    const parent = module.children && module.children.length > 0;
    if (!privilegesOfRoleId) {
      return false;
    }
    if (parent) {
      return this.containOne(this.role.privileges, module.children);
    }
    return this.role.privileges ? (this.role.privileges.some(item => item === module.id)) : false;
  }

  containOne(privileges: string[], all: Privilege[]): boolean {
    if (!privileges || privileges.length === 0 || !all || all.length === 0) {
      return false;
    }
    for (const m of all) {
      if (privileges.includes(m.id)) {
        return true;
      }
    }
    return false;
  }

  getPrivilege(id: string, all: Privilege[]): Privilege {
    if (!all || !id) {
      return null;
    }
    for (const root of all) {
      if (root.id === id) {
        return root;
      }
      if (root.children && root.children.length > 0) {
        const m = this.getPrivilege(id, root.children);
        if (m) {
          return m;
        }
      }
    }
    return null;
  }

  buildPrivileges(id: string, type: string, privileges: string[], all: Privilege[]): string[] {
    if (type === 'parent') {
      const parent = this.getPrivilege(id, all);
      const ids = parent && parent.children ? parent.children.map(i => i.id) : [];
      const ms = privileges.filter(i => !ids.includes(i));
      if (this.containOne(privileges, parent.children)) {
        return ms;
      } else {
        const children = parent && parent.children ? parent.children : [];
        return ms.concat(children.map(i => i.id));
      }
    } else {
      let checked = true;
      if (privileges && privileges.length > 0) {
        const m = privileges.find(item => item === id);
        checked = (m != null);
      } else {
        checked = false;
      }
      if (!checked) {
        return privileges.concat([id]);
      } else {
        return privileges.filter(item => item !== id);
      }
    }
  }

  showModel(role: Role) {
    this.role = role;
    if (!role) {
      return;
    }
    const { all } = this;
    if (!role.privileges) {
      role.privileges = [];
    } else {
      role.privileges = role.privileges.map(p => p.split(' ', 1)[0]);
    }
    this.setCheckedAll(role.privileges, all);
  }

  setCheckedAll(privileges: string[], all: string[]) {
    this.checkedAll = privileges && all && privileges.length === all.length;
  }

  handleCheck(event) {
    const { role, all, allPrivileges } = this;
    const target = event.target;
    const id = target.getAttribute('id');
    const type = target.getAttribute('data-type');
    role.privileges = this.buildPrivileges(id, type, role.privileges, allPrivileges);
    this.setCheckedAll(role.privileges, all);
  }

  handleCheckAll = (event: any) => {
    const { role, all } = this;
    this.checkedAll = event.target.checked;
    this.role.privileges = (this.checkedAll ? all : []);
  }

  protected getModelName(): string {
    return 'role';
  }

  elements(form: any, childName: string[]): any {
    const array = [];
    for (const f of form) {
      if (childName.includes(f.name)) {
        array.push(f);
      }
    }
    return array;
  }
}
