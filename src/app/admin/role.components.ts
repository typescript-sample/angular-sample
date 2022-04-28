import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditComponent, navigate } from '@/app/common';
import { handleError, inputEdit } from 'uione';
import { MasterDataClient } from './service/master-data';
import { Privilege, Role, RoleClient } from './service/role';

function getPrivilege(id: string, all: Privilege[]): Privilege|undefined {
  if (!all || !id) {
    return undefined;
  }
  for (const root of all) {
    if (root.id === id) {
      return root;
    }
    if (root.children && root.children.length > 0) {
      const m = getPrivilege(id, root.children);
      if (m) {
        return m;
      }
    }
  }
  return undefined;
}
function containOne(privileges?: string[], all?: Privilege[]): boolean {
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
function buildAll(privileges: string[], all: Privilege[]): void {
  for (const root of all) {
    privileges.push(root.id);
    if (root.children && root.children.length > 0) {
      buildAll(privileges, root.children);
    }
  }
}
function buildPrivileges(id: string, type: string, privileges: string[], all: Privilege[]): string[] {
  if (type === 'parent') {
    const parent = getPrivilege(id, all);
    if (parent && parent.children) {
      const ids = parent.children.map(i => i.id);
      const ms = privileges.filter(i => !ids.includes(i));
      if (containOne(privileges, parent.children)) {
        return ms;
      } else {
        return ms.concat(parent.children.map(i => i.id));
      }
    } else {
      return [];
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
function buildShownModules(keyword: string, allPrivileges: Privilege[]): Privilege[] {
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
  }).filter(item => (item.children && item.children.length > 0) || item.name.toLowerCase().includes(w));
  return shownPrivileges;
}
@Component({
  selector: 'app-role',
  templateUrl: './role.html',
  providers: [RoleClient, MasterDataClient]
})
export class RoleComponent extends EditComponent<Role, any> implements OnInit {
  constructor(viewContainerRef: ViewContainerRef, route: ActivatedRoute, private roleService: RoleClient, private masterDataService: MasterDataClient, protected router: Router) {
    super(viewContainerRef, route, roleService, inputEdit());
    this.patchable = false;
    this.role = this.createModel();
  }
  role: Role;
  checkedAll?: boolean;
  keyword: string = '';

  all: string[] = [];
  allPrivileges: Privilege[] = [];
  shownPrivileges: Privilege[] = [];
  statusList: any = [];
  disabled?: boolean;
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
      buildAll(all, allPrivileges);
      this.all = all;
      this.allPrivileges = allPrivileges;
      this.shownPrivileges = allPrivileges;
      super.load(id);
    }).catch(handleError);
  }


  onChangeKeyword(event:any) {
    const keyword = event.target.value;
    const { allPrivileges } = this;
    this.shownPrivileges = buildShownModules(keyword, allPrivileges);
  }


  checkedRole(module: Privilege, privilegesOfRoleId?: string[]) {
    const parent = module.children && module.children.length > 0;
    if (!privilegesOfRoleId) {
      return false;
    }
    if (parent) {
      return containOne(this.role.privileges, module.children);
    }
    return this.role.privileges ? (this.role.privileges.some(item => item === module.id)) : false;
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

  handleCheck(event:any) {
    const { role, all, allPrivileges } = this;
    const target = event.target;
    const id = target.getAttribute('id');
    const type = target.getAttribute('data-type');
    role.privileges = buildPrivileges(id, type, role.privileges ? role.privileges : [], allPrivileges);
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
  assign(event: Event, id: string){
    event.preventDefault();
    navigate(this.router,`/admin/roles/assign`,[id]);
  };
}
