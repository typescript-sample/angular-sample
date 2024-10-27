import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditComponent } from 'angularx';
import { formatter } from 'ui-plus';
import { emailOnBlur, handleError, inputEdit, numberOnFocus, phoneOnBlur, requiredOnBlur } from 'uione';
import { Gender } from 'uione';
import { MasterDataClient } from './service/master-data';
import { User, UserClient } from './service/user';
import { Item } from 'onecore';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user.html',
  providers: [UserClient]
})
export class UserComponent extends EditComponent<User, string> implements OnInit {
  constructor(viewContainerRef: ViewContainerRef, route: ActivatedRoute, userService: UserClient, protected masterDataService: MasterDataClient) {
    super(viewContainerRef, route, userService, inputEdit());
  }
  user: User = {} as any;
  titles: Item[] = [];
  positions: Item[] = [];
  ngOnInit() {
    this.onInit();
  }
  requiredOnBlur(event: any) {
    requiredOnBlur(event);
  }
  numberOnFocus(event: any) {
    numberOnFocus(event, this.getLocale ? this.getLocale() : undefined);
  }
  emailOnBlur(event: any) {
    emailOnBlur(event);
  }
  phoneOnBlur(event: any) {
    phoneOnBlur(event);
  }
  formatPhone(phone: string) {
    this.user.phone = formatter.formatPhone(phone);
  }
  getModelName(): string {
    return 'user';
  }

  load(id: string) {
    Promise.all([
      this.masterDataService.getTitles(),
      this.masterDataService.getPositions(),
      this.masterDataService.getGenders()
    ]).then(values => {
      const [titleList, positionList] = values;
      this.titles = titleList;
      this.positions = positionList;
      super.load(id);
    }).catch(handleError);
  }

  loadGender(user?: User) {
    user = user === undefined ? this.user : user;
    if (user.title === 'Mr') {
      this.user = { ...user, gender: Gender.Male };
    } else {
      this.user = { ...user, gender: Gender.Female };
    }
  }
}
