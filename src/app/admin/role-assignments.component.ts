import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clone, buildId, EditComponent, error, hideLoading, message, showLoading } from '@/app/common';
import { confirm } from 'ui-alert';
import { handleError, inputEdit } from 'uione';
import { Role, RoleClient } from './service/role';
import { User, UserClient } from './service/user';

@Component({
  selector: 'app-role-assign',
  templateUrl: './role-assignment.html',
  providers: [RoleClient, UserClient]
})
export class RoleAssignmentsComponent extends EditComponent<Role, string> implements OnInit {
  constructor(protected viewContainerRef: ViewContainerRef, route: ActivatedRoute, private roleClient: RoleClient, private userClient: UserClient) {
    super(viewContainerRef, route, roleClient, inputEdit());
  }

  role: Role;
  isCheckboxShown: boolean;
  users: User[];
  q = '';
  isOpenModel: false;
  selectedUsers: User[] = [];

  ngOnInit() {
    const id = buildId<string>(this.route);
    if (id) {
      this.initialize(id);
    }
  }
  initialize = (id: string) => {
    const userService = this.userClient;
    const roleService = this.roleClient;
    Promise.all([
      userService.getUsersByRole(id),
      roleService.load(id),
    ]).then(values => {
      const [users, role] = values;
      if (role) {
        this.users = users;
        this.role = role;
        this.orginalModel = clone(role);
      }
    }).catch(handleError);
  }
  getUserIds():string[]{
    const userIds = [] as any;
    this.users.forEach(item =>{
      userIds.push(item.userId);
    })
    return userIds;
  }
  onSave(isBack?: boolean): void {    
    // const isBackO = (isBack == null || isBack === undefined ? this.backOnSuccess : isBack);    
    const com = this;
    const msg = message(this.resourceService.value, 'msg_confirm_save', 'confirm', 'yes', 'no');
    this.confirm(msg.message,msg.title, ()=>{
      showLoading(this.loading);
      com.running = true;
      this.roleClient.assign(this.role.roleId,this.getUserIds()).then((result)=>{
        // com.postSave(result, isBackO);
        com.running = false;
        hideLoading(com.loading);   
             
      }).catch(err => {        
        error(err, com.resourceService.value, com.showError);
        com.running = false;
        
        hideLoading(com.loading);
      });
    },msg.no,msg.yes)
    
  }
  onShowCheckBox = () => {
    if (this.isCheckboxShown === false) {
      this.isCheckboxShown = true;
    } else {
      this.isCheckboxShown = false;
    }
  }
  
  onCheckAll() {
    this.selectedUsers = this.users;
  }

  onUnCheckAll() {
    this.selectedUsers = [];
  }

  isChecked(usersChecked:Array<User>, userId:string): boolean {
    if (usersChecked === null || usersChecked === undefined) {
      return false;
    }
    for (let i = 0; i < usersChecked.length; i++) {
      if (usersChecked[i].userId === userId) {
        return true;
      }
    }
    return false;
  }


  onModelSave(arr: User[]) {
    arr.map((user) => {
      this.users.push(user);
    });
    this.isOpenModel = false;
  }

  onSearch(e:any) {
    const users = this.users;
    if (users) {
      const v = e.target.value;
      const result = users.filter(u => u.username && u.username.includes(v) || u.displayName && u.displayName.includes(v) || u.email && u.email.includes(v));
      (this as any)[e.target.name] = e.target.value;
      this.users = result;
    }
  }

  onDeleteCheckBox() {
    const r = this.resourceService.resource();
    confirm(r.msg_confirm_delete, 'Confirm', () => {
      this.users = this.users.filter(value => {
        const user = this.selectedUsers.find(v => v.userId === value.userId);
        if (!user) {
          return value;
        }
      });
      this.selectedUsers = [];
      this.isCheckboxShown = false;
    });
  }

  onCheck(userId: string) {
    if (this.users) {
      const user = this.users.find(v => v.userId === userId);
      if (user) {
        const index = this.selectedUsers.indexOf(user);
        if (index !== -1) {
          delete this.selectedUsers[index];
        } else {
          this.selectedUsers.push(user);
        }
      }
    }
  }

}