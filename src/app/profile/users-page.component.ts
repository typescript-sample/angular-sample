import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { navigate, SearchComponent } from "angularx";
import { alert, inputSearch } from "uione";

import { UserClient } from "./user";
import { User, UserFilter } from "./user/user";
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html'
})
export class UsersPage extends SearchComponent<User, UserFilter> implements OnInit {
  constructor(protected viewContainerRef: ViewContainerRef, protected router: Router, userService: UserClient) {
    super(viewContainerRef, userService, inputSearch());
  }
  interest = '';
  skill = '';
  ngOnInit(): void {
    this.onInit();
  }
  femaleIcon = "assets/images/male.png";
  maleIcon = "assets/images/female.png";
  viewUser(userId: string) {
    navigate(this.router, 'users', [userId]);
  }
  edit(userId: string) {
    navigate(this.router, 'admin/users/edit', [userId]);
  }
  add() {
    navigate(this.router, 'admin/users/add');
  }
  removeInterest(e: Event, subject: string) {
    e.preventDefault();
    if (this.filter.interests) {
      const interests = this.filter.interests.filter(
        (item: string) => item !== subject
      );
      this.filter.interests = interests;
    }
  };
  addInterest(e: Event) {
    e.preventDefault();
    const interests = this.filter.interests ? this.filter.interests : [];
    if (this.interest && (this.interest.trim() !== "")) {
      if (!inArray(interests, (this.interest))) {
        interests.push(this.interest);
        this.filter.interests = interests;
        this.interest = '';

      } else {
        alert(this.resource.error_duplicated_interest, this.resource.error);
      }
    }
  }
}

export function inArray(arr: string[], item: string): boolean {
  if (!arr || arr.length === 0) {
    return false;
  }
  const isExist = arr.filter((itemFilter) => itemFilter === item).length > 0;
  return isExist;
}