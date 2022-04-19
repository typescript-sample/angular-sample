import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { initElement, SearchComponent } from '@/app/common';
import { inputSearch, registerEvents, storage } from 'uione';
import { User, UserClient, UserFilter } from './service/user';

@Component({
  selector: 'app-users-lookup',
  templateUrl: './users-lookup.html',
  providers: [UserClient]
})
export class UsersLookupComponent extends SearchComponent<User, UserFilter> implements OnInit {
  constructor(viewContainerRef: ViewContainerRef, protected router: Router, userService: UserClient) {
    super(viewContainerRef, userService, inputSearch());
  }

  @Input() selectedUsers: any[] = [];
  protected checked: any[] = [];
  public userId: string;
  list: User[];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  closeModalFn: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.form = initElement(this.viewContainerRef, registerEvents);    
    this.load(this.createSearchModel(), storage.autoSearch);
        
  }

  setList(list: User[]): void {
    this.list = list.filter(item => !this.selectedUsers.some(item2 => item2.userId === item.userId));
  }

  createSearchModel(): UserFilter {
    const obj: any = {};
    return obj;
  }

  onCheckUser(event: any): void {
    if (event.target.checked) {
      const result = this.getList().find((value) => value.userId === event.target.value);
      this.checked.push(result);
    } else {
      for (let i = 0; i < this.list.length; i++) {
        if (this.checked[i].userId === event.target.value) {
          this.checked.splice(i, 1);
        }
      }
    }
  }

  onModelSave() {
    this.onSave.emit(this.checked);
    this.checked = [];
    this.closeModalFn.emit(this.checked);
  }

  existInArray(list: Array<Object>, itemSelect: any, fieldName: string) {
    return list.some((item:any) => {
      return item && itemSelect && item[fieldName] === itemSelect[fieldName];
    });
  }

  public clearUserId = () => {
    this.userId = '';
    this.load(this.createSearchModel(), storage.autoSearch);
  }

  onSearch(event:any) {
    event.preventDefault();
    if (this.getList() && this.userId.length > 0) {
      const result = this.getList().filter((value) => {
        return value['userId'].includes(this.userId);
      });
      this.setList(result);
    }
  }
}
